import Checkbox from "../components/basic/checkBox";


const  ComponentPage = ()  => {



    return (
      <div className="componenent-page" style={{width:"30%",display:"flex",flexDirection:'column',justifyContent:'center', alignItems:'center', textAlign:'center'}}>
          <h1>Ceci est un titre de niveau 1</h1>
            <h2>Ceci est un titre de niveau 2</h2>
            <h3>Ceci est un titre de niveau 3</h3>
            <h4>Ceci est un titre de niveau 4</h4>
            <h5>Ceci est un titre de niveau 5</h5>
            <h6>Ceci est un titre de niveau 6</h6>

            <p>Ceci est un paragraphe de texte.</p>


            <p><strong>Ceci est un texte en gras.</strong></p>


            <p><em>Ceci est un texte en italique.</em></p>

            <p><u>Ceci est un texte souligné.</u></p>


            <p><s>Ceci est un texte barré.</s></p>

            <p>Visitez <a href="https://www.example.com">ce lien</a>.</p>


            <input type="text" placeholder="Saisissez du texte ici" /><br />

            <input type="email" placeholder="email" /><br />

            <input type="password" placeholder="Mot de passe" /><br />


            <button type="button">Cliquez-moi</button><br />


            <input type="submit" value="Envoyer" /><br />


            <input type="reset" value="Réinitialiser" /><br />

            <Checkbox isCheck={true}/>
            <Checkbox isCheck={false}/>
            <label htmlFor="checkbox">Ceci est une case à cocher</label><br />

            <div><input type="radio" id="radio1" name="radiogroup" />
            <label htmlFor="radio1">Option 1</label></div><br />
            <div><input type="radio" id="radio2" name="radiogroup" />
            <label htmlFor="radio2">Option 2</label></div><br />
            <div><input type="radio" id="radio3" name="radiogroup" />
            <label htmlFor="radio3">Option 3</label></div><br />


            <select>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select><br />


            <textarea rows="4" cols="50" placeholder="Saisissez du texte ici"></textarea><br />

            <input type="file"></input><br />
        
      </div>
    );
  }
  
  export default ComponentPage;
