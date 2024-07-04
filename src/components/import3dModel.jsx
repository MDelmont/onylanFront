import { useState } from "react";
import TrophieModel from "./trophieModel";
import  utilsFunction  from '../utils/utilsFunction'
const Import3dModel = () => {
  const initalValueData =  {
    camera:{
      fov:75,
      position:{
          z:6,
      }
  },
    axeHelper:true,
    isRotate:false,
    glbFile:null,
    color:"#ff843d",
    rotation : {
      axes : {
        x:1.8,
        y:0,
        z:0.7,
      },
      piece :{
        x:0,
        y:0,
        z:0,
      },
      speed:0.01,
     
    },

    translation : {
      x:-0.5,
      y:-2,
      z:0,
    },
}
    const [trophieModelData, setTrophieModelData] = useState( {...initalValueData}
       

    )
    const handleReset = (e) => {
      e.preventDefault();
      setTrophieModelData({...initalValueData,glbFile:trophieModelData.glbFile})
    }
    const handleChange = (e) => {

        const { name, value, files, type,checked } = e.target;
        const nameParts = name.split('-');
        let updatedData = { ...trophieModelData };
        let newValue;
        if (type=="checkbox"){
          newValue = checked;
      } else if(type=="file"){
          const file = files[0];
     
          if (file.type === "model/gltf-binary" || file.name.endsWith(".glb")) {
              
            newValue = file
            }
      } else  if(type=="number"){
        newValue = parseFloat(value);
      }else{
        newValue = value;
      }
      if (newValue !== null || newValue !== undefined){
     
        utilsFunction.modifyValueInObjectWhithPath(updatedData,nameParts,newValue)
        setTrophieModelData(updatedData)
      }
      
      };
      const resetGlbFile =() =>{
        setTrophieModelData({...trophieModelData ,glbFile:null,})
        const fileInput = document.getElementById('glbFile');
        fileInput.value = '';
      } 
      const handleValid = (e) => {
        e.preventDefault();
        //code pour validation envoyer la data
      }

      const dataInput = [

        {htmlFor:"axeHelper",title:"Afficher les axes",type:"checkbox",id:"axeHelper",name:"axeHelper",value:trophieModelData.axeHelper, onChange:handleChange},
        {htmlFor:"isRotate",title:"Mettre en rotation la pièces",type:"checkbox",id:"isRotate",name:"isRotate",value:trophieModelData.isRotate, onChange:handleChange},
        {htmlFor:"rotation-speed",title:"Vitesse de rotation",type:"number",id:"rotation-speed",name:"rotation-speed",value:trophieModelData.rotation.speed, onChange:handleChange},
        {htmlFor:"camera-fov",title:"Zoom",type:"number",id:"camera-fov",name:"camera-fov",value:trophieModelData.camera.fov, onChange:handleChange},
        {htmlFor:"rotation-axes-x",title:"Rotation axe x",type:"number",id:"rotation-axes-x",name:"rotation-axes-x",value:trophieModelData.rotation.axes.x, onChange:handleChange},
        {htmlFor:"rotation-axes-y",title:"Rotation axe y",type:"number",id:"rotation-axes-y",name:"rotation-axes-y",value:trophieModelData.rotation.axes.y, onChange:handleChange},
        {htmlFor:"rotation-axes-z",title:"Rotation axe z",type:"number",id:"rotation-axes-z",name:"rotation-axes-z",value:trophieModelData.rotation.axes.z, onChange:handleChange},
        {htmlFor:"rotation-piece-x",title:"Rotation piece x",type:"number",id:"rotation-piece-x",name:"rotation-piece-x",value:trophieModelData.rotation.piece.x, onChange:handleChange},
        {htmlFor:"rotation-piece-y",title:"Rotation piece y",type:"number",id:"rotation-piece-y",name:"rotation-piece-y",value:trophieModelData.rotation.piece.y, onChange:handleChange},
        {htmlFor:"rotation-piece-z",title:"Rotation piece z",type:"number",id:"rotation-piece-z",name:"rotation-piece-z",value:trophieModelData.rotation.piece.z, onChange:handleChange},
        {htmlFor:"translation-x",title:"Translation x",type:"number",id:"translation-x",name:"translation-x",value:trophieModelData.translation.x, onChange:handleChange},
        {htmlFor:"translation-y",title:"Translation y",type:"number",id:"translation-y",name:"translation-y",value:trophieModelData.translation.y, onChange:handleChange},
        {htmlFor:"translation-z",title:"Translation z",type:"number",id:"translation-z",name:"translation-z",value:trophieModelData.translation.z, onChange:handleChange},
        {htmlFor:"color",title:"Couleur",type:"color",id:"color",name:"color",value:trophieModelData.color, onChange:handleChange},
      ]
  
    return <div className="import-model">
  <form action="" className="form" style={{display:"flex",flexDirection:"column"}}>


        <label htmlFor="glbFile">
        <span>Fichier GLB :</span>
        <input
            type="file"
            id="glbFile"
            name="glbFile"
            accept=".glb, model/gltf-binary"
            style={{ display: "none" }}
            onChange={handleChange}
            
        />
        {!trophieModelData.glbFile && <div className="second-btn"><span>Choisir un fichier</span></div>}
        </label>
        {trophieModelData.glbFile && (
            <div>
            <p>Fichier sélectionné : {trophieModelData.glbFile.name}</p>
            {trophieModelData.glbFile && <TrophieModel trophieModelData={trophieModelData} modifyPosition={true}/>}
            <button onClick={resetGlbFile}>Supprimer le fichier</button>
            </div>
        )}
        
        {
          dataInput.map(({htmlFor,title,type,id,name,value,onChange},index) => {
            return  <label key={index} htmlFor={htmlFor}>
                <span>{title + " :"}</span>
       
                <input
                  type={type}
                  id={id}
                  name={name}
                  checked={value}
                  value={value}
                  onChange={onChange}
               
                  placeholder={title}
                  step={name =="rotation-speed" ?0.01:name =="camera-fov"?1:0.1}
                />
          </label>
          })
        } 
        <button onClick={handleReset}>reset</button>
        <button onClick={handleValid}>Valider</button>

        </form>
    
  </div>



}
export default Import3dModel;