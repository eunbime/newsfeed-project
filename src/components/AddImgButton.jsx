import { ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { storage } from '../firebase' // storage로 변경

function AddImgButton() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (selectedFile) {
      const storageRef = ref(storage, 'folder/' + selectedFile.name) // storage로 변경
      await uploadBytes(storageRef, selectedFile)
      console.log('File uploaded successfully!')
      // 이후 원하는 추가적인 작업 수행 가능
    } else {
      console.error('No file selected!')
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  )
}

export default AddImgButton
