<template>
    <form ref="createForm" class="create-post" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="create__title">Create a post</div>
        <label for="ttext">Title</label>
        <input type="text" name="ttext" id="ttext" v-model="title" required>
        <label for="ptext">Post</label>
        <textarea name="ptext" id="ptext" v-model="body"></textarea>
        <input type="file" ref="file" name="image" id="image" @change="onFileSelected">
        <div class="buttons">
            <input type="submit"  value="Submit">
        </div>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            title: '',
            body: '',
            imgFile: null
        }
    },
    mounted() {
        let myToken_deserialized = JSON.parse(localStorage.getItem('myToken'));
        if(myToken_deserialized  === null || undefined){
        this.$router.push('/login')
     }
    },
    methods: {
         onFileSelected() {
            this.imgFile = this.$refs.file.files[0];
            console.log(this.imgFile);
        },
        async submitForm() {
            //const form = this.$refs.createForm;
            let fd = new FormData();
            //append the image as a file
            if(this.imgFile != null) {
                fd.append('imgFile', this.imgFile, this.imgFile.name);
            }
            //create a dataset
            let dataset = {title: this.title, body: this.body, imgFile: this.imgFile};
            //append the dataset as json
            fd.append('otherFields', JSON.stringify(dataset));
            
            let myToken_deserialized = JSON.parse(localStorage.getItem('myToken'));
            if(myToken_deserialized  === null || undefined) {
                this.$router.push('/login');
            } else {

                try {
                    await axios.post("http://localhost:3000/api/posts", fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + myToken_deserialized.token
                        }
                    });
                    // this.message = "File has been uploaded";
                    // this.file = "";
                    // this.error = false;
                } catch(err) {
                    console.log(err)
                    // this.message =err.response.data.error;
                    // this.error = true;
                }
                this.$router.push('/');
                this.title = "";
                this.body = "";
            }   
        }
    }
}
</script>

<style>
    .create__title {
        color: #30415F;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
  }
    textarea {
        display: block;
        width: 100%;
        outline: none;
        resize: none;
        border: 1px solid #ddd;
    }
    textarea:focus {
        border: 1px solid black;
    }
</style>