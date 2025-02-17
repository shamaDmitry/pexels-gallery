import { NavLink } from 'react-router'

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-4">
          <NavLink to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
            Home
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
