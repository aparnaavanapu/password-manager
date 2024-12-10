import './index.css'

const PasswordItem=(props)=>{
    const {details,deleteUserDetails,showPasswords}=props
    const {id,website,username,password,bgColor}=details

    const deleteDetailsContainer=()=>{
        deleteUserDetails(id);

    }

    return(
        <li className="list-item">
            <p className={`logo ${bgColor}`}>{username[0].toUpperCase()}</p>
            <div className="password-details-container">
                <p className="input-text">{website}</p>
                <p className="input-text">{username}</p>
                <p className="input-text">{showPasswords?(password):('*************')}</p>
            </div>
            <button className="delete-btn" onClick={deleteDetailsContainer}><img src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png" alt="delete" className="delete-icon"/></button>
        </li>

    )
}

export default PasswordItem