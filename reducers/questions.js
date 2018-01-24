import {
  CREATE_QUESTION_SUCCESS,
  FETCH_QUEUE_REQUEST,
  FETCH_QUEUE_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  UPDATE_QUESTIONS,
} from '../constants/ActionTypes'

const defaultState = {
  isFetching: false,
  error: false,
  questions: {},
}

const reduceQuestions = questions => questions.reduce((obj, item) => {
  // eslint-disable-next-line no-param-reassign
  obj[item.id] = item
  return obj
}, {})

const questions = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_QUESTION_SUCCESS: {
      const { question } = action
      return Object.assign({}, state, {
        questions: {
          ...state.questions,
          [question.id]: question,
        },
      })
    }
    case FETCH_QUEUE_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
      })
    }
    case FETCH_QUEUE_SUCCESS: {
      const { queue } = action
      return Object.assign({}, state, {
        isFetching: false,
        questions: {
          ...state.questions,
          ...reduceQuestions(queue.questions),
        },
      })
    }
    case DELETE_QUESTION_SUCCESS: {
      const { questionId } = action
      return Object.assign({}, state, {
        questions: {
          ...state.questions,
          [questionId]: undefined,
        },
      })
    }
    case UPDATE_QUESTIONS: {
      console.log(action)
      return Object.assign({}, state, {
        questions: {
          ...state.questions,
          ...reduceQuestions(action.questions),
        },
      })
    }
    default:
      return state
  }
}

export default questions