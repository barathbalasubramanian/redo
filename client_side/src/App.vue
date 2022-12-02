
<template>
<div>
    <input type="text" name="name" v-model="name">
    <input type="password" name="password" v-model="password">
    <button @click="register">register</button>
    <div>
        <form @submit.prevent="clicked">
            <div class="form-group">
              <input type="file" name="file" id='file' ref="file" @change="changes">
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</div>
</template>

<script>

import auth from '../src/services/auth'

export default {

    data() {
        return {
            name: '',
            password: '',
            file: 'barath'
        }
    },
    
    methods: {
        async register() {
            try {
                const res = await auth.register({
                    name: this.name,
                    password: this.password
                })
                console.log('Successfully send' , res.data)
            }
            catch(err) {
                console.log('error', err)
            }
        },
        
        changes(e) {
            e.preventDefault()
            const uploadfile = e.target.files[0];
            this.file = uploadfile
        },

        async clicked() {
            try {
                let formData = new FormData()
                console.log(this.file)
                formData.append('file', this.file)
                
                const res = await auth.upload({
                    file: formData
                })
                console.log('Successfully send to backend', res.data )
            }
            catch(err) {
                console.log('error', err)
            }
        }
    }
}

</script>

<style scoped>

</style>
