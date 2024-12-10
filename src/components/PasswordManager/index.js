import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

const initialContainerBackgroundClassNames = [
    'amber',
    'blue',
    'orange',
    'emerald',
    'teal',
    'red',
    'light-blue',
  ]

class PasswordManager extends Component{
    state={
        
        website:'',
        username:'',
        password:'',
        passwordsList:[],
        count:0,
        searchInput:'',
        showPasswords:false
        
    }

   

    onChangeWebsite=(event)=>{
        this.setState({website:event.target.value})
        console.log(this.state.website)
        
    }
    onChangeUsername=(event)=>{
        this.setState({username:event.target.value})
    }
    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    }
    onAddPassword=(event)=>{
        event.preventDefault()
        const {website,username,password}=this.state
        const newPassword={
            id:uuidv4(),
            website,
            username,
            password,
            bgColor:initialContainerBackgroundClassNames[Math.floor(Math.random() * initialContainerBackgroundClassNames.length)]

        }
        this.setState(prevState=>(
            {
                passwordsList:[...prevState.passwordsList,newPassword],
                count:prevState.count+1,
                website:'',
                username:'',
                password:''
                
            }
        ))
    }

    deleteUserDetails=(id)=>{
        this.setState(prevState=>(
            {
                passwordsList:prevState.passwordsList.filter(eachItem=>eachItem.id!==id),
                count:prevState.count-1

            }
        ))

    }
    onChangeSearchInput=(event)=>{
        const { passwordsList } = this.state;
        const searchInput = event.target.value;
        const searchResults = passwordsList.filter((eachItem) =>
            eachItem.website.toLowerCase().includes(searchInput.toLowerCase())
        );
        this.setState({searchInput,
            count:searchResults.length
        })
    }

    toggleShowPasswords=()=>{
        this.setState(prevState=>({showPasswords:!prevState.showPasswords}))
    }


    render(){
        const {passwordsList,count,searchInput,showPasswords}=this.state
        const searchResults=passwordsList.filter(eachItem=>(
            eachItem.website.toLowerCase().includes(searchInput.toLowerCase())

        ))
        return(
            <div className="bg-container">
                <img src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" alt="logo" className="logo-img" />
                <div className="card-container-1">
                    <form className="form-container" onSubmit={this.onAddPassword}>
                        <p className="form-heading">Add New Password</p>
                        <div className="input-field">
                            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png" alt="webiste" className="input-icon" />
                            <input type="text" placeholder="Enter Website" className="input-container" value={this.state.website} onChange={this.onChangeWebsite}/>
                        </div>
                        <div className="input-field">
                            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png" alt="username" className="input-icon" />
                            <input type="text" placeholder="Enter Username" className="input-container" value={this.state.username} onChange={this.onChangeUsername}/>
                        </div>
                        <div className="input-field">
                            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png " alt="password" className="input-icon" />
                            <input type="password" placeholder="Enter Password" className="input-container" value={this.state.password} onChange={this.onChangePassword}/>
                        </div>
                        <button type="submit" className="btn">Add</button>
                    </form>
                    <div className="image-container">
                       <img src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png" alt="password manager" className="password-manager-img" /> 
                    </div>
                </div>
                <div className="card-container-2">
                    <div className="top-section">
                        <p className="ur-passwords">Your Passwords <span>{count}</span></p>
                        <div className="search-container">
                            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png " alt="search" className="input-icon" />
                            <input type="search" placeholder="Search" className="input-container" onChange={this.onChangeSearchInput}/>
                        </div> 
                    </div>
                    <hr/>
                    <div className="checkbox-container">
                         <input type="checkbox" id="show-pass" onChange={this.toggleShowPasswords}/>
                         <label htmlFor="show-pass">Show Passwords</label>
                    </div>
                    
                    {count?
                    (<ul className="my-passwords-container">
                        {searchResults.map(eachItem=>(
                            <PasswordItem details={eachItem} key={eachItem.id} deleteUserDetails={this.deleteUserDetails} showPasswords={showPasswords}/>
                        ))}

                    </ul>):(
                        <div className="no-passwords-container">
                            <img src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png" alt="no passwords" className="no-passwords-img" />
                            <p className="no-passwords-text">No Passwords</p>
                        </div>)
                    }

                </div>
            </div>
        )
    }

}

export default PasswordManager


