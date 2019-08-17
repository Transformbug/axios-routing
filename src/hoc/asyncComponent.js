import React,{Component} from 'react';

const asyncComponent = (importComponent) => {
    return (
        //VAŽNO: ovo je orignalno bila anonimna class, ali sam je nazvao jer sam tamo u Blog.js htio sa c.log-om potvrdit da asyncComponet returna to.
        class Mate extends Component{
         
        state={
            component: null
        }    
           //VAŽNO: jedino što je async ovdje i tamo u Blog.js je return toga import putem fn.calla tj. promise objekt i njehova .then metoda. Sve ove druge
           //fn. tj. komponente koje je on zvao async nisu zapravo async.To je očito, ali htio sam napisati.
        componentDidMount() {
            console.log('MateKojiSeReturna, ComponenDidMount metoda');
            importComponent()
            .then(cmp=>{
                console.log('ovo je rasponse tj. cmp unutar thena', cmp );
                this.setState({component: cmp.default})
            })
        }


            render (){
                const C=this.state.component
                console.log('MateKojiSeReturna, render metoda');

                return C? <C{...this.props}/>: null
            }
        }
    );
};

export default asyncComponent;