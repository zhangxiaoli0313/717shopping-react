import { USER_INFO } from '../../store/reducers'
export default function mapDispatchToProps(dispatch){
    return {
        saveUser(){
            dispatch({
                type:USER_INFO
            })
        }
    }
}