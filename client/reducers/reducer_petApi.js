import { GET_PET_NEWS, GET_PET } from '../actions/getPets';

export function petApi_Reducer(state = {}, action) {
  switch (action.type) {
    case GET_PET_NEWS:
      return Object.assign({}, state,
        { //articles is an array of objects
          articles: action.data.data.response.docs
        });
      case GET_PET:
        return Object.assign({}, state,
          {
            adoptPetData: {
              age: action.data.age,
              animal: action.data.animal,
              breed: action.data.breed,
              email: action.data.email,
              description: action.data.description,
              photos: action.data.photos,
              name: action.data.name,
              sex: action.data.sex
            }
          });
      default:
        return state;
  }
}
