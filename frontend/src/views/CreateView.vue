<template>
    <form ref="createForm" class="create-post" v-on:submit.prevent="submitForm" enctype="multipart/form-data">
        <label for="ttext">Title</label>
        <input type="text" name="ttext" id="ttext" v-model="title" >
        <label for="ptext">Post</label>
        <input type="text" name="ptext" id="ptext" v-model="body" >
        <input type="file" name="image" id="image" @change="onFileSelected">
        <div class="buttons">
            <input type="submit" value="Submit">
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            body: '',
            imgFile: ''
        }
    },
    methods: {
        onFileSelected(event) {
            this.imgFile = event.target.files[0];
            console.log(this.imgFile);
        },
        submitForm() {
            //const form = this.$refs.createForm;
            // Post request using fetch with error handling
            const fd = new FormData();
            //append the image as a file
            fd.append('imgFile', this.imgFile);
            //create a dataset
            const data = {title: this.title, body: this.body};
            //append the dataset as json
            fd.append('otherFields', JSON.stringify(data));
            
            let myToken_deserialized = JSON.parse(localStorage.getItem('myToken'));
            if(myToken_deserialized  === null || undefined) {
                this.$router.push('/login');
            } else {
                console.log(Array.from(fd));
                const myHeaders = new Headers({
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + myToken_deserialized.token
                });
                fetch("http://localhost:3000/api/posts", {
                method: 'POST',
                headers: myHeaders,
                data: fd
                })
                .then((response) => response.json())
                .then((data) =>  {
                    console.log("Success: ", data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }   
        }
    }
}
</script>