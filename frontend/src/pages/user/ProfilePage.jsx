import { User } from 'lucide-react';
import Input from '../../components/Input2.jsx'
import {useAuthStore} from '../../store/AuthStore.js'
import { useEffect, useState } from 'react';
// todo: add edite button that change into save button if info is same then don't do anything if change made then send request to the backend
const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:''
  })
  const {user} = useAuthStore();
  
  const handleSignUp = async(e) =>{
    e.preventDefault();
    try {
      await signup(formData.email,formData.password,formData.name);
      console.log(formData.email,formData.password,formData.name)
      setFormData({...formData, email:'',name:'',password:''})
      navigate("/verify-email")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
      setFormData({...formData, email:user?.email,name:user?.name})
  },[])
  return (
    <div className='w-full h-[40rem] flex justify-center py-4 px-20 my-10 border-2'>
      <div className='w-[70%] flex flex-col items-center gap-10 rounded-2xl border-2 '>
          <div></div>
          <img src={user?.profilpic || "/avatar.png"} alt="" className='size-20 border-2 rounded-full p-1'/>
          <form onSubmit={handleSignUp} className='w-[50%]'>
            <Input icon={User} 
            type="text" 
            placeholder="Please Enter Name"
            value={formData.name}
            onChange={(e)=> setFormData({...formData, name:e.target.value})} disabled/>
      
          </form>
      </div>
    </div>
  )
}

export default ProfilePage