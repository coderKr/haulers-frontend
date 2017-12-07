var options = {
      title: 'Upload image',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      returnBase64Image: true,
      returnIsVertical: false
    };
UIImagePickerManager.showImagePicker(options, (type, response) => {
      if (type !== 'cancel') {
        var source;
        if (type === 'data') { 
          source = {uri: 'data:image/jpeg;base64,' + response, isStatic: true};
        } else { 
          source = {uri: response};
        }

        console.log("uploading image");

         fetch('server-endpoint',{
           method: 'post',
           body: "data=" + encodeURIComponent(source.uri)
         }).then(response => {
           console.log("image uploaded")
           console.log(response)
         }).catch(console.log);

        //this.setState({avatarSource:source});
      } else {
        console.log('Cancel');
      }
    });