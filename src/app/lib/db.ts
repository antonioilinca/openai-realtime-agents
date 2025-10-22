import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "fitcoach.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

type SlotInfo = {
  dayIndex: number;
  slotType: string;
};

const mealSlots: SlotInfo[] = [];
const slotTypes = ["breakfast", "snack_am", "lunch", "snack_pm", "dinner"];
for (let day = 0; day < 7; day += 1) {
  for (const slot of slotTypes) {
    mealSlots.push({ dayIndex: day, slotType: slot });
  }
}

function initialize() {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      weight REAL NOT NULL,
      height REAL NOT NULL,
      age INTEGER NOT NULL,
      activity_level INTEGER NOT NULL,
      goal TEXT NOT NULL,
      location TEXT NOT NULL,
      calories INTEGER NOT NULL,
      protein INTEGER NOT NULL,
      carbs INTEGER NOT NULL,
      fats INTEGER NOT NULL,
      water REAL NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
  ).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      protein REAL NOT NULL,
      carbs REAL NOT NULL,
      fats REAL NOT NULL,
      calories REAL NOT NULL,
      substitutions TEXT,
      notes TEXT,
      origin TEXT NOT NULL DEFAULT 'custom'
    )`
  ).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS meal_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_index INTEGER NOT NULL,
      slot_type TEXT NOT NULL,
      meal_id INTEGER,
      UNIQUE(day_index, slot_type),
      FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE SET NULL
    )`
  ).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      equipment TEXT,
      sets TEXT,
      reps TEXT,
      duration TEXT,
      rest TEXT,
      notes TEXT,
      focus TEXT,
      location TEXT,
      origin TEXT NOT NULL DEFAULT 'custom'
    )`
  ).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS workout_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_index INTEGER NOT NULL UNIQUE,
      workout_id INTEGER,
      source TEXT NOT NULL DEFAULT 'rest',
      FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE SET NULL
    )`
  ).run();

  const insertSlot = db.prepare(
    `INSERT OR IGNORE INTO meal_slots (day_index, slot_type, meal_id)
     VALUES (@dayIndex, @slotType, NULL)`
  );
  mealSlots.forEach((slot) => insertSlot.run(slot));

  const ensureScheduleRow = db.prepare(
    `INSERT OR IGNORE INTO workout_schedule (day_index, workout_id, source)
     VALUES (?, NULL, 'rest')`
  );
  for (let day = 0; day < 7; day += 1) {
    ensureScheduleRow.run(day);
  }
}

initialize();

export default db;
