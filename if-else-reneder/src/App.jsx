import Settings from "./components/Settings"
import UserDashboard from "./components/UserDashboard"
import { useState } from "react"

function App() {
  const [user, setUser] = useState({
    name: 'Иван Петров',
    email: 'user@gmail.com',
    age: 20,
    isAdmin: true,
    isActive: true
  })  

  function toggleField(field) {
		setUser(prev => ({...prev, [field]: !prev[field]}))
	}	

  return (
    <>
      <UserDashboard user={user} error={''} isLoading={false}> 
        <Settings user={user} onToggleField={toggleField} />
      </UserDashboard>     
    </>
  )
}

export default App
