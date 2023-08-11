/**
 * React Native SQLite Demo
 * Copyright (c) 2018-2020 Bruce Lefebvre <bruce@brucelefebvre.com>
 * https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE
 */
import { AppState, AppStateStatus } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import moment from 'moment'

import { Dev } from '@constants'
import { DatabaseInitialization } from './DatabaseInitialization'
import MEBR from '@models/MEBR'

let databaseInstance: SQLite.SQLiteDatabase | undefined

export interface Database {
  // 팔로잉 전체 삭제
  deleteAllMebrFlwgs(): Promise<void>
  // 내팔로잉 목록 받아서 등록 ApiManager.myFollowingList
  createAllMebrFlwgs(
    mebrMgmtNmbr: string,
    list: MEBR[]
  ): Promise<void>
  // 팔로잉 추가
  addMebrFlwg(mebrMgmtNmbr: string, mebr: MEBR): Promise<void>
  // 팔로잉 삭제
  deleteMebrFlwg(
    mebrMgmtNmbr: string,
    flwgMebrMgmtNmbr: string
  ): Promise<void>

  // 팔로잉/팔로워 목록 조회
  getFollowList(
    mebrMgmtNmbr: string,
    type: 'FOLLOWING' | 'FOLLOWER',
    page: number,
    pageSize: 100,
    srchUserId?: string
  ): Promise<MEBR[]>

  // 팔로잉 여부 조회
  getIsMyFollwer(
    mebrMgmtNmbr: string,
    flwgMebrMgmtNmbr: string
  ): Promise<boolean>
}

async function deleteAllMebrFlwgs(): Promise<void> {
  Dev.log('[db] Deleting list all.')
  return getDatabase()
    .then((db) => {
      // Delete list items first, then delete the list itself
      db.executeSql('DELETE FROM TB_MEBR_FLWG;').then(() => db)
    })
    .then(() => {
      Dev.log('[db] Deleted list all')
    })
}

// Insert a new list into the database
async function createAllMebrFlwgs(
  mebrMgmtNmbr: string,
  list: MEBR[]
): Promise<void> {
  return getDatabase()
    .then((db) => {
      let query =
        'INSERT INTO TB_MEBR_FLWG (MEBR_MGMT_NMBR, FLWG_MEBR_MGMT_NMBR, FLWG_USER_ID, FLWG_MEBR_FILE_MGMT_NMBR, REGDATETIME) VALUES '
      list.forEach((mebr, idx) => {
        query += `('${mebrMgmtNmbr}','${mebr.mebrMgmtNmbr}','${
          mebr.userId
        }','${mebr.mebrFileMgmtNmbr || ''}','${mebr.regdatetime}')`
        query += idx === list.length - 1 ? ';' : ','
      })
      return db.executeSql(query)
    })
    .then(([results]) => {
      const { insertId } = results
      Dev.log(`[db] Added list InsertId: ${insertId}`)
    })
}

async function addMebrFlwg(
  mebrMgmtNmbr: string,
  mebr: MEBR
): Promise<void> {
  if (mebr === undefined) {
    return Promise.reject(Error(`Could not add item to empty item.`))
  }
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO TB_MEBR_FLWG (MEBR_MGMT_NMBR, FLWG_MEBR_MGMT_NMBR, FLWG_USER_ID, FLWG_MEBR_FILE_MGMT_NMBR, REGDATETIME) VALUES (?, ?, ?, ?, ?);',
        [
          mebrMgmtNmbr,
          mebr.mebrMgmtNmbr,
          mebr.userId,
          mebr.mebrFileMgmtNmbr || '',
          moment().format('YYYYMMDD HH:mm:ss'),
        ]
      )
    )
    .then(([results]) => {
      Dev.log(
        `[db] created successfully with id: ${results.insertId}`
      )
    })
}

async function deleteMebrFlwg(
  mebrMgmtNmbr: string,
  flwgMebrMgmtNmbr: string
): Promise<void> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'DELETE FROM TB_MEBR_FLWG WHERE MEBR_MGMT_NMBR = ? AND FLWG_MEBR_MGMT_NMBR = ?;',
        [mebrMgmtNmbr, flwgMebrMgmtNmbr]
      )
    )
    .then(() => {
      Dev.log(`[db] Deleted list member: "${flwgMebrMgmtNmbr}"!`)
    })
}

async function getFollowList(
  targetMebrMgmtNmbr: string,
  type: 'FOLLOWING' | 'FOLLOWER',
  page: number,
  pageSize: 100,
  srchUserId?: string
): Promise<MEBR[]> {
  return getDatabase()
    .then((db) => {
      let query = ''
      const ifSrchUserId =
        srchUserId !== ''
          ? `FLWG_USER_ID LIKE '%${srchUserId}%'`
          : '1=1'

      if (type === 'FOLLOWING') {
        query = `SELECT FLWG_MEBR_MGMT_NMBR as mebrMgmtNmbr
                      , FLWG_USER_ID as userId
                      , FLWG_MEBR_FILE_MGMT_NMBR as mebrFileMgmtNmbr
                      , REGDATETIME as regdatetime
                      , 1 as myFlwCnt
                   FROM TB_MEBR_FLWG F
                  WHERE MEBR_MGMT_NMBR = '${targetMebrMgmtNmbr}'
                    AND ${ifSrchUserId}
                  LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};`
      } else {
        query = `SELECT FLWG_MEBR_MGMT_NMBR as mebrMgmtNmbr
                      , FLWG_USER_ID as userId
                      , FLWG_MEBR_FILE_MGMT_NMBR as mebrFileMgmtNmbr
                      , REGDATETIME as regdatetime
                      , (SELECT COUNT(*) FROM TB_MEBR_FLWG WHERE MEBR_MGMT_NMBR = F.MEBR_MGMT_NMBR AND FLWG_MEBR_MGMT_NMBR = '${targetMebrMgmtNmbr}') as myFlwCnt
                   FROM TB_MEBR_FLWG F
                  WHERE FLWG_MEBR_MGMT_NMBR = '${targetMebrMgmtNmbr}'
                    AND ${ifSrchUserId}
                  LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};`
      }
      return db.executeSql(query)
    })
    .then(([results]) => {
      if (results === undefined) {
        return []
      }
      const count = results.rows.length
      const listItems: MEBR[] = []
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i)
        const {
          mebrMgmtNmbr,
          userId,
          mebrFileMgmtNmbr,
          regdatetime,
          myFlwCnt,
        } = row

        const item = new MEBR(mebrMgmtNmbr)
        item.userId = userId
        item.mebrFileMgmtNmbr = mebrFileMgmtNmbr
        item.regdatetime = regdatetime
        item.myFlwCnt = myFlwCnt

        listItems.push(item)
      }
      Dev.log(`[db] follows for list "${targetMebrMgmtNmbr}":`)
      return listItems
    })
}

async function getIsMyFollwer(
  mebrMgmtNmbr: string,
  flwgMebrMgmtNmbr: string
): Promise<boolean> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        'SELECT COUNT(*) FROM TB_MEBR_FLWG WHERE MEBR_MGMT_NMBR = ? AND FLWG_MEBR_MGMT_NMBR = ?;',
        [mebrMgmtNmbr, flwgMebrMgmtNmbr]
      )
    )
    .then((results) => {
      Dev.log(`[db] isFollowing: "${results}"!`)
      if (results === undefined) {
        return false
      }
      return true
    })
}

// "Private" helpers
async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance)
  }
  // otherwise: open the database first

  // SQLite.deleteDatabase({
  //   name: Const.DATABASE.FILE_NAME,
  //   location: 'default',
  // })
  return open()
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(true)
  SQLite.enablePromise(true)

  if (databaseInstance) {
    Dev.log(
      '[db] Database is already open: returning the existing instance'
    )
    return databaseInstance
  }
  const DB_FILE_NAME = 'AppDatabase.db'

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DB_FILE_NAME,
    location: 'default',
  })
  Dev.log('[db] Database open!')

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization()
  await databaseInitialization.updateDatabaseTables(db)

  databaseInstance = db
  return db
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    Dev.log("[db] No need to close DB again - it's already closed")
    return
  }
  const status = await databaseInstance.close()
  Dev.log('[db] Database closed. - ' + status)
  databaseInstance = undefined
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active'
Dev.log('[db] Adding listener to handle app state changes')
AppState.addEventListener('change', handleAppStateChange)

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus): void {
  if (
    appState === 'active' &&
    nextAppState.match(/inactive|background/)
  ) {
    // App has moved from the foreground into the background (or become inactive)
    Dev.log(
      '[db] App has gone to the background - closing DB connection.'
    )
    close()
  }
  appState = nextAppState
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  deleteAllMebrFlwgs,
  createAllMebrFlwgs,
  addMebrFlwg,
  deleteMebrFlwg,
  getFollowList,
  getIsMyFollwer,
}
