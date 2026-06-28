import { useState, useEffect } from 'react'
import { Menu, Plus, ChefHat } from 'lucide-react'
import Sidebar from './components/Sidebar'
import RecipeView from './components/RecipeView'
import RecipeModal from './components/RecipeModal'
import { SEED_RECIPES } from './data/recipes'

const STORAGE_KEY = 'recipes-v2'

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      // If localStorage has data (even empty array), use it.
      // Otherwise seed from the committed JSON so new devices start with your recipes.
      if (stored !== null) return JSON.parse(stored)
      return SEED_RECIPES
    } catch {
      return SEED_RECIPES
    }
  })
  const [selectedId, setSelectedId] = useState(null)
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const selectedRecipe = recipes.find(r => r.id === selectedId) ?? null

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const handleSelect = (id) => {
    setSelectedId(id)
    setSidebarOpen(false)
  }

  const handleSave = (recipe) => {
    setRecipes(prev => {
      const exists = prev.some(r => r.id === recipe.id)
      return exists ? prev.map(r => r.id === recipe.id ? recipe : r) : [...prev, recipe]
    })
    setSelectedId(recipe.id)
    setShowModal(false)
    setEditingRecipe(null)
  }

  const handleDelete = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id))
    setSelectedId(null)
  }

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingRecipe(null)
  }

  return (
    <div className="flex h-screen bg-cream-100 font-sans overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-brown/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        recipes={recipes}
        selectedId={selectedId}
        onSelect={handleSelect}
        onAdd={() => setShowModal(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile top bar */}
        <MobileHeader
          title={selectedRecipe?.title}
          onMenu={() => setSidebarOpen(true)}
          onAdd={() => setShowModal(true)}
        />

        <RecipeView
          recipe={selectedRecipe}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>

      {showModal && (
        <RecipeModal
          initialRecipe={editingRecipe}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

function MobileHeader({ title, onMenu, onAdd }) {
  return (
    <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-cream-300 bg-cream-100 shrink-0">
      <button onClick={onMenu} className="p-1 text-brown-soft">
        <Menu size={20} />
      </button>
      <span className="font-serif text-base font-medium text-brown flex-1 truncate">
        {title ?? <span className="flex items-center gap-1.5 text-brown-muted"><ChefHat size={15} /> Recipes</span>}
      </span>
      <button onClick={onAdd} className="p-1 text-amber-warm">
        <Plus size={20} />
      </button>
    </div>
  )
}
