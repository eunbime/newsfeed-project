import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

function Fileupload() {
  const [selectedFile, setSelectedFile] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const onFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const uploadImageAndGetURL = async () => {
    if (selectedFile) {
      const storageRef = ref(storage, 'folder/' + selectedFile.name)
      await uploadBytes(storageRef, selectedFile)
      console.log('File uploaded successfully!')
      const url = await getDownloadURL(storageRef)
      setImageUrl(url)
      console.log('Image URL:', url)
      return url
    } else {
      console.error('No file selected!')
      return ''
    }
  }
  return (
    <div>
      <input type="file" onChange={onFileSelect} />
      <button type="submit">Submit and Upload Image</button>
    </div>
  )
}

export default Fileupload