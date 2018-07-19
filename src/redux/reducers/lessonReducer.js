import { combineReducers } from 'redux';
import { LESSON_ACTIONS } from '../actions/lessonActions';

const lessons = (state = {student_id: '', lessonRecords:[], recordsObtained: false, targetLesson: 0, failure: false}, action) => {
  switch (action.type) {
    case LESSON_ACTIONS.FETCH_LESSON_RECORD_FAILURE_FALSE:
        return {...state, failure: false}
    case LESSON_ACTIONS.FETCH_LESSON_FAILURE:
        return {...state, failure: true}
    case LESSON_ACTIONS.SET_TARGET_LESSON:
        return {...state, targetLesson: action.payload}
    case LESSON_ACTIONS.SET_LESSON_RECORDS:
        if (action.lessons.length > 0 && action.lessons[0].teacher_name){
                console.log('setting lessonRecords:', action.lessons);
        return {...state, lessonRecords: action.lessons, recordsObtained:true}
        }
        else{
        console.log('got back no lessons!');
        return {...state, lessonRecords: action.lessons, recordsObtained:false, errorDisplay: true}
        }
    case LESSON_ACTIONS.ADD_LESSON_VOCAB:
        let targetLessonIndex = action.payload.targetLesson;
        let targetLessonOriginal = state.lessonRecords[targetLessonIndex];
        let newVocabList = [...state.lessonRecords[targetLessonIndex].vocab];
        let newWord = action.payload.vocabToSubmit;
        newVocabList.push(newWord);
        targetLessonOriginal.vocab = newVocabList;
        let fullLessonRecordsArray = [...state.lessonRecords];
        fullLessonRecordsArray.splice(targetLessonIndex,1,targetLessonOriginal)
        return {...state, lessonRecords: fullLessonRecordsArray}
    case LESSON_ACTIONS.ADD_LESSON_PHRASE:
        let targetLessonIndexPhrases = action.payload.targetLesson;
        let targetLessonOriginalPhrases = state.lessonRecords[targetLessonIndexPhrases];
        let newPhraseList = [...state.lessonRecords[targetLessonIndexPhrases].phrases]
        let newPhrase = action.payload.phraseToSubmit;
        newPhraseList.push(newPhrase);
        targetLessonOriginalPhrases.phrases = newPhraseList;
        let fullLessonRecordsArrayPhrases = [...state.lessonRecords];
        fullLessonRecordsArrayPhrases.splice(targetLessonIndexPhrases,1,targetLessonOriginalPhrases)
        return {...state, lessonRecords: fullLessonRecordsArrayPhrases}
    case LESSON_ACTIONS.DELETE_VOCAB:
        let targetLessonIndexDelete = action.payload.targetLesson;
        let targetLessonOriginalDelete = state.lessonRecords[targetLessonIndexDelete]; 
        let newVocabListDelete = [...state.lessonRecords[targetLessonIndexDelete].vocab];   
        let vocabToDelete = action.payload.word;    
        targetLessonOriginalDelete.vocab = newVocabListDelete.filter(word => word !== vocabToDelete);
        fullLessonRecordsArray = [...state.lessonRecords];
        fullLessonRecordsArray.splice(targetLessonIndexDelete,1,targetLessonOriginalDelete)
        return {...state, lessonRecords: fullLessonRecordsArray}
    case LESSON_ACTIONS.DELETE_PHRASE:
        targetLessonIndex = action.payload.targetLesson;
        targetLessonOriginal = state.lessonRecords[targetLessonIndex];
        newPhraseList = [...state.lessonRecords[targetLessonIndex].phrases];  
        let phraseToDelete = action.payload.phrase;
        targetLessonOriginal.phrases = newPhraseList.filter(word => word !== phraseToDelete);
        fullLessonRecordsArray = [...state.lessonRecords];
        fullLessonRecordsArray.splice(targetLessonIndex, 1, targetLessonOriginal);
        return {...state, lessonRecords: fullLessonRecordsArray}
    default:
      return state;
  }
};

export default combineReducers({
  lessons,
});