import Dexie from "dexie";
import "dexie-export-import";
export const db = new Dexie("wavemakerv4");

export const DBstores = {
  Settings: `uuid, settings, lastupdated`,
  Writer: `uuid, title, description, files, lastupdated`,
  Cards: `uuid, title,description,content,style,labels,options,lastupdated`,
  Snowflake: `uuid, title, description,content,lastupdated`,
  Timeline: `uuid, title, description,content,lastupdated`,
  Gridplanner: `uuid, title, description,content,lastupdated`,
  Mindmap: `uuid, title, description,content,lastupdated`,
  ImageLibrary: `uuid, title, base64`
}
db.version(1).stores(DBstores);


export const databaseImport = async (blob) => {
  await db.import(blob, { clearTablesBeforeImport: true })
}

export const databaseExport = async () => {
  const blob = await db.export()
  return blob
}

export default db