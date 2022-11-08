import Dexie from "dexie";
import "dexie-export-import";
export const db = new Dexie("wavemakerv4");

//note this has to match in  dexieDB and db.js
/*
This is painfully hacky - maybe I can pop the stores in here as an export into dexieDB where its needed for the VUE stuff
this is only really here as the import and export were not working inside vue
*/

db.version(1).stores({
  Settings: `$$uuid, settings, lastupdated`,
  Projects: `$$uuid, projectname, lastupdated`,
  Writer: `$$uuid, projectID ,title, description, files, lastupdated`,
  Pages: `$$uuid, projectID, writerID ,content, notes ,lastupdated`,
  Cards: `$$uuid,projectID ,title,description,content,style,labels,options,lastupdated`,
  Snowflake: `$$uuid,projectID ,title, description,content,lastupdated`,
  Timeline: `$$uuid,projectID ,title, description,content,lastupdated`,
  Gridplanner: `$$uuid, projectID ,title, description,content,lastupdated`,
  Mindmap: `$$uuid, projectID ,title, description,content,lastupdated`,
  ImageLibrary: `$$uuid, title, base64`
});


export const databaseImport = async (blob) => {
  await db.import(blob, { clearTablesBeforeImport: true })
}

export const databaseExport = async () => {
  const blob = await db.export()
  return blob
}

export default db