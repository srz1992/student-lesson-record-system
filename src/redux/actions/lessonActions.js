export const LESSON_ACTIONS = {
   

    // set target lesson
    SET_TARGET_LESSON: 'SET_TARGET_LESSON',

    // get lesson records
    FETCH_LESSON_RECORDS: 'FETCH_LESSON_RECORDS',
    SET_LESSON_RECORDS: 'SET_LESSON_RECORDS',
    FETCH_LESSON_FAILURE: 'FETCH_LESSON_FAILURE',
    FETCH_LESSON_RECORD_FAILURE_FALSE: 'FETCH_LESSON_RECORD_FAILURE_FALSE',
    // update lesson record
    UPDATE_LESSON_RECORD: 'UPDATE_LESSON_RECORD',
    // SET_LESSON_RECORD: 'SET_LESSON_RECORD',

    // update vocab and phrases stored in reducer before sending
    
        // add a vocab or phrase to a specific lesson in the reducer
        ADD_LESSON_VOCAB: 'ADD_LESSON_VOCAB',
        ADD_LESSON_PHRASE: 'ADD_LESSON_PHRASE',
        
        // delete a vocab or phrase from a specific lesson in the reducer
        DELETE_VOCAB: 'DELETE_VOCAB',
        DELETE_PHRASE: 'DELETE_PHRASE',

    RESET_RECORDS_OBTAINED: 'RESET_RECORDS_OBTAINED'
}