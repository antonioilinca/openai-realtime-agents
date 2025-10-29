import Foundation
import CoreData
import Combine

final class PersistenceController: ObservableObject {
    static let shared = PersistenceController()

    let container: NSPersistentContainer
    @Published private(set) var profilCourant: UserProfile?

    private init(inMemory: Bool = false) {
        let model = NSManagedObjectModel.fitAICoachModel()
        container = NSPersistentContainer(name: "FitAICoach", managedObjectModel: model)

        if inMemory {
            container.persistentStoreDescriptions.first?.url = URL(fileURLWithPath: "/dev/null")
        }

        container.loadPersistentStores { _, error in
            if let error = error {
                fatalError("Erreur de chargement du magasin Core Data: \(error.localizedDescription)")
            }
        }
        container.viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
        chargerProfil()
    }

    func sauvegarderProfil(_ profil: UserProfile) {
        do {
            let contexte = container.viewContext
            let requete: NSFetchRequest<UserProfileEntity> = UserProfileEntity.fetchRequest()
            let entite = try requete.execute().first ?? UserProfileEntity(context: contexte)
            entite.id = profil.id
            entite.genre = profil.genre
            entite.age = Int16(profil.age)
            entite.taille = profil.taille
            entite.poids = profil.poids
            entite.objectif = profil.objectif
            entite.typeEntrainement = profil.typeEntrainement
            entite.seancesParSemaine = Int16(profil.seancesParSemaine)
            entite.restrictions = try JSONEncoder().encode(profil.restrictionsAlimentaires)
            entite.niveauActivite = profil.niveauActivite
            entite.budget = profil.budgetAlimentaire
            entite.preferences = try JSONEncoder().encode(profil.preferencesAlimentaires)
            try contexte.save()
            profilCourant = profil
        } catch {
            print("Erreur de sauvegarde du profil: \(error)")
        }
    }

    func enregistrerPlan(type: PlanSnapshotEntity.PlanType, jour: Int, donnees: Data) {
        let contexte = container.viewContext
        let snapshot = PlanSnapshotEntity(context: contexte)
        snapshot.id = UUID()
        snapshot.type = type.rawValue
        snapshot.jour = Int16(jour)
        snapshot.payload = donnees
        snapshot.dateCreation = Date()
        do {
            try contexte.save()
        } catch {
            print("Erreur d'enregistrement du plan: \(error)")
        }
    }

    func chargerPlan<T: Decodable>(type: PlanSnapshotEntity.PlanType, jour: Int, as: T.Type) -> T? {
        let contexte = container.viewContext
        let requete: NSFetchRequest<PlanSnapshotEntity> = PlanSnapshotEntity.fetchRequest()
        requete.predicate = NSPredicate(format: "type == %@ AND jour == %d", type.rawValue, jour)
        requete.sortDescriptors = [NSSortDescriptor(keyPath: \PlanSnapshotEntity.dateCreation, ascending: false)]
        do {
            if let snapshot = try contexte.fetch(requete).first, let data = snapshot.payload {
                return try JSONDecoder().decode(T.self, from: data)
            }
        } catch {
            print("Erreur de chargement du plan: \(error)")
        }
        return nil
    }

    func enregistrerMessages(_ messages: [ChatMessage]) {
        let contexte = container.viewContext
        let fetch: NSFetchRequest<ChatMessageEntity> = ChatMessageEntity.fetchRequest()
        do {
            let existants = try contexte.fetch(fetch)
            existants.forEach(contexte.delete)
            for message in messages {
                let entite = ChatMessageEntity(context: contexte)
                entite.id = message.id
                entite.role = message.role.rawValue
                entite.contenu = message.contenu
                entite.date = message.date
            }
            try contexte.save()
        } catch {
            print("Erreur de sauvegarde des messages: \(error)")
        }
    }

    func chargerMessages() -> [ChatMessage] {
        let contexte = container.viewContext
        let fetch: NSFetchRequest<ChatMessageEntity> = ChatMessageEntity.fetchRequest()
        fetch.sortDescriptors = [NSSortDescriptor(keyPath: \ChatMessageEntity.date, ascending: true)]
        do {
            return try contexte.fetch(fetch).compactMap { entite in
                guard let roleRaw = entite.role, let role = ChatMessage.Role(rawValue: roleRaw), let contenu = entite.contenu, let date = entite.date else { return nil }
                return ChatMessage(id: entite.id ?? UUID(), role: role, contenu: contenu, date: date)
            }
        } catch {
            print("Erreur de chargement des messages: \(error)")
            return []
        }
    }

    func enregistrerProgression(_ entree: ProgressEntry) {
        let contexte = container.viewContext
        let entite = ProgressEntryEntity(context: contexte)
        entite.id = entree.id
        entite.date = entree.date
        entite.poids = entree.poids
        entite.imc = entree.imc
        entite.charge = entree.charge
        entite.calories = entree.caloriesDepensees
        do {
            try contexte.save()
        } catch {
            print("Erreur de sauvegarde de la progression: \(error)")
        }
    }

    func chargerProgression() -> [ProgressEntry] {
        let contexte = container.viewContext
        let fetch: NSFetchRequest<ProgressEntryEntity> = ProgressEntryEntity.fetchRequest()
        fetch.sortDescriptors = [NSSortDescriptor(keyPath: \ProgressEntryEntity.date, ascending: true)]
        do {
            return try contexte.fetch(fetch).map { entite in
                ProgressEntry(id: entite.id ?? UUID(), date: entite.date ?? Date(), poids: entite.poids, imc: entite.imc, charge: entite.charge, caloriesDepensees: entite.calories)
            }
        } catch {
            print("Erreur de chargement de la progression: \(error)")
            return []
        }
    }

    func setupDefaultData() {
        if profilCourant == nil {
            let profil = UserProfile(genre: "Non défini", age: 25, taille: 175, poids: 70, objectif: "Bien-être", typeEntrainement: "Mixte", seancesParSemaine: 3, restrictionsAlimentaires: [], niveauActivite: "Modéré", budgetAlimentaire: "Standard", preferencesAlimentaires: ["Varié"])
            sauvegarderProfil(profil)
        }
    }

    private func chargerProfil() {
        let contexte = container.viewContext
        let fetch: NSFetchRequest<UserProfileEntity> = UserProfileEntity.fetchRequest()
        do {
            if let entite = try contexte.fetch(fetch).first {
                let profil = UserProfile(id: entite.id ?? UUID(), genre: entite.genre ?? "Non défini", age: Int(entite.age), taille: entite.taille, poids: entite.poids, objectif: entite.objectif ?? "Bien-être", typeEntrainement: entite.typeEntrainement ?? "Mixte", seancesParSemaine: Int(entite.seancesParSemaine), restrictionsAlimentaires: (try? JSONDecoder().decode([String].self, from: entite.restrictions ?? Data())) ?? [], niveauActivite: entite.niveauActivite ?? "Modéré", budgetAlimentaire: entite.budget ?? "Standard", preferencesAlimentaires: (try? JSONDecoder().decode([String].self, from: entite.preferences ?? Data())) ?? [])
                profilCourant = profil
            }
        } catch {
            print("Erreur de chargement du profil: \(error)")
        }
    }
}

extension NSManagedObjectModel {
    static func fitAICoachModel() -> NSManagedObjectModel {
        let model = NSManagedObjectModel()

        let userEntity = NSEntityDescription()
        userEntity.name = "UserProfileEntity"
        userEntity.managedObjectClassName = NSStringFromClass(UserProfileEntity.self)

        let idAttr = NSAttributeDescription()
        idAttr.name = "id"
        idAttr.attributeType = .UUIDAttributeType
        idAttr.isOptional = false

        let stringAttr: (String) -> NSAttributeDescription = { name in
            let attr = NSAttributeDescription()
            attr.name = name
            attr.attributeType = .stringAttributeType
            attr.isOptional = true
            return attr
        }

        let doubleAttr: (String) -> NSAttributeDescription = { name in
            let attr = NSAttributeDescription()
            attr.name = name
            attr.attributeType = .doubleAttributeType
            attr.isOptional = false
            return attr
        }

        let intAttr: (String) -> NSAttributeDescription = { name in
            let attr = NSAttributeDescription()
            attr.name = name
            attr.attributeType = .integer16AttributeType
            attr.isOptional = false
            return attr
        }

        let dataAttr: (String) -> NSAttributeDescription = { name in
            let attr = NSAttributeDescription()
            attr.name = name
            attr.attributeType = .binaryDataAttributeType
            attr.isOptional = true
            return attr
        }

        userEntity.properties = [idAttr,
                                 stringAttr("genre"),
                                 intAttr("age"),
                                 doubleAttr("taille"),
                                 doubleAttr("poids"),
                                 stringAttr("objectif"),
                                 stringAttr("typeEntrainement"),
                                 intAttr("seancesParSemaine"),
                                 dataAttr("restrictions"),
                                 stringAttr("niveauActivite"),
                                 stringAttr("budget"),
                                 dataAttr("preferences")]

        let planEntity = NSEntityDescription()
        planEntity.name = "PlanSnapshotEntity"
        planEntity.managedObjectClassName = NSStringFromClass(PlanSnapshotEntity.self)

        let typeAttr = stringAttr("type")
        typeAttr.isOptional = false

        let jourAttr = NSAttributeDescription()
        jourAttr.name = "jour"
        jourAttr.attributeType = .integer16AttributeType
        jourAttr.isOptional = false

        let payloadAttr = dataAttr("payload")
        payloadAttr.isOptional = true

        let dateAttr = NSAttributeDescription()
        dateAttr.name = "dateCreation"
        dateAttr.attributeType = .dateAttributeType
        dateAttr.isOptional = false

        planEntity.properties = [idAttr.copy() as! NSAttributeDescription, typeAttr, jourAttr, payloadAttr, dateAttr]

        let chatEntity = NSEntityDescription()
        chatEntity.name = "ChatMessageEntity"
        chatEntity.managedObjectClassName = NSStringFromClass(ChatMessageEntity.self)
        let roleAttr = stringAttr("role")
        roleAttr.isOptional = false
        chatEntity.properties = [idAttr.copy() as! NSAttributeDescription, roleAttr, stringAttr("contenu"), dateAttr.copy() as! NSAttributeDescription]

        let progressEntity = NSEntityDescription()
        progressEntity.name = "ProgressEntryEntity"
        progressEntity.managedObjectClassName = NSStringFromClass(ProgressEntryEntity.self)

        let imcAttr = doubleAttr("imc")
        let chargeAttr = doubleAttr("charge")
        let caloriesAttr = doubleAttr("calories")
        progressEntity.properties = [idAttr.copy() as! NSAttributeDescription, dateAttr.copy() as! NSAttributeDescription, doubleAttr("poids"), imcAttr, chargeAttr, caloriesAttr]

        model.entities = [userEntity, planEntity, chatEntity, progressEntity]
        return model
    }
}

@objc(UserProfileEntity)
final class UserProfileEntity: NSManagedObject {
    @NSManaged var id: UUID?
    @NSManaged var genre: String?
    @NSManaged var age: Int16
    @NSManaged var taille: Double
    @NSManaged var poids: Double
    @NSManaged var objectif: String?
    @NSManaged var typeEntrainement: String?
    @NSManaged var seancesParSemaine: Int16
    @NSManaged var restrictions: Data?
    @NSManaged var niveauActivite: String?
    @NSManaged var budget: String?
    @NSManaged var preferences: Data?
}

@objc(PlanSnapshotEntity)
final class PlanSnapshotEntity: NSManagedObject {
    enum PlanType: String {
        case workout
        case nutrition
    }

    @NSManaged var id: UUID?
    @NSManaged var type: String?
    @NSManaged var jour: Int16
    @NSManaged var payload: Data?
    @NSManaged var dateCreation: Date?
}

@objc(ChatMessageEntity)
final class ChatMessageEntity: NSManagedObject {
    @NSManaged var id: UUID?
    @NSManaged var role: String?
    @NSManaged var contenu: String?
    @NSManaged var date: Date?
}

@objc(ProgressEntryEntity)
final class ProgressEntryEntity: NSManagedObject {
    @NSManaged var id: UUID?
    @NSManaged var date: Date?
    @NSManaged var poids: Double
    @NSManaged var imc: Double
    @NSManaged var charge: Double
    @NSManaged var calories: Double
}
extension UserProfileEntity {
    @nonobjc class func fetchRequest() -> NSFetchRequest<UserProfileEntity> {
        NSFetchRequest<UserProfileEntity>(entityName: "UserProfileEntity")
    }
}

extension PlanSnapshotEntity {
    @nonobjc class func fetchRequest() -> NSFetchRequest<PlanSnapshotEntity> {
        NSFetchRequest<PlanSnapshotEntity>(entityName: "PlanSnapshotEntity")
    }
}

extension ChatMessageEntity {
    @nonobjc class func fetchRequest() -> NSFetchRequest<ChatMessageEntity> {
        NSFetchRequest<ChatMessageEntity>(entityName: "ChatMessageEntity")
    }
}

extension ProgressEntryEntity {
    @nonobjc class func fetchRequest() -> NSFetchRequest<ProgressEntryEntity> {
        NSFetchRequest<ProgressEntryEntity>(entityName: "ProgressEntryEntity")
    }
}
