export default function UserDashboard({user, error, isLoading, children}) {
    
    function handleUser(){
        if(isLoading){ return <p>Загрузка текста...</p> }
        if(error){ return <p>Ошибка: {error}</p>}
        if(!user){ return <p>Пользователь не найден</p>} 
        return ( 
            <>            
                <table className="if-else-table">
                    <tbody>
                        <tr>
                            <td>Пользователь</td>
                            <td>{user.name} {user.isAdmin && <span>⭐</span>}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Возраст</td>
                            <td>{user.age}</td>
                        </tr>
                        <tr>
                            <td>Статус</td>
                            <td><span className="user-status" style={{ backgroundColor: user.isActive ? 'lime' : 'lightgrey'}}></span></td>
                        </tr>
                    </tbody>
                </table>
                {children}
            </>               
        )
    }

  return (
    <>
        {handleUser()}
    </>
  )
}
