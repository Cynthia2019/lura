import React, {useState} from 'react'
import API from '../utils/API'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const temp2 = '&key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin'

function ChangeCertName(props) {
    const [open, setOpen] = useState(false)
    var name = null
    function updateInfo () {
        API.patch(`/manufacturers/admin/edit/${props.id}/certificates/name?index=${props.index}${temp2}`, 
        {
            name:name
        }).then(res=>{if(res.status===200){
            alert('update Successfully')
            setOpen(false)
        }})
    }
    return(
        <div style={{margin:'5px'}}>
            <Button onClick={()=>setOpen(true)} variant='outline-dark'>Update Name</Button>
            <Modal show={open} onHide={()=>setOpen(false)}>
                <Modal.Header closeButton>Change Name</Modal.Header>
                <Modal.Body>
                    <Form.Control placeholder='new name' onChange={(e)=>{name = e.target.value}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateInfo} variant='outline-info'>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function ChangeCertLabel(props) {
    const [open, setOpen] = useState(false)
    var label = null
    function updateInfo () {
        API.patch(`/manufacturers/admin/edit/${props.id}/certificates/label?index=${props.index}${temp2}`, 
        {
            label:label
        }).then(res=>{if(res.status===200){
            alert('update Successfully')
            setOpen(false)
        }})
    }
    return(
        <div style={{margin:'5px'}}>
            <Button onClick={()=>setOpen(true)} variant='outline-dark'>Update Label</Button>
            <Modal show={open} onHide={()=>setOpen(false)}>
                <Modal.Header closeButton>Change Label</Modal.Header>
                <Modal.Body>
                    <Form.Control placeholder='new label' onChange={(e)=>{label = e.target.value}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateInfo} variant='outline-info'>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function ChangeCertFile(props) {
    const [open, setOpen] = useState(false)
    var file = null
    function updateInfo () {
        console.log(file)
        var f = new FormData()
        f.append('image',file)
        API.patch(`/manufacturers/admin/edit/${props.id}/certificates/image?index=${props.index}${temp2}`, 
        f,{headers:{'Content-Type':'multipart/form-data'}}).then(res=>{if(res.status===200){
            alert('update Successfully')
            setOpen(false)
        }})
    }
    return(
        <div style={{margin:'5px'}}>
            <Button onClick={()=>setOpen(true)} variant='outline-dark'>Update File</Button>
            <Modal show={open} onHide={()=>setOpen(false)}>
                <Modal.Header closeButton>Change File</Modal.Header>
                <Modal.Body>
                    <Form.File onChange={(e)=>{file = e.target.files[0]}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateInfo} variant='outline-info'>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function ChangeInfo (props) {
    if(props.type==='name'){
       return( ChangeCertName(props))
    }
    else if (props.type==='label'){
        return (ChangeCertLabel(props))
    }
    else {
        return (ChangeCertFile(props))
    }
}

export default ChangeInfo