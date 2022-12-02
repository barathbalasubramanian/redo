import api from '../services/api'

export default {
    register(credentials) {
        
        return api().post('register',credentials)
    },
    upload (credentials) {
        
        return api().post('upload' , credentials)
    }
}