import { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'
import { INGREDIENT_ICONS } from '../data/recipes'

const emptySection = () => ({ heading: '', body: '' })

export default function RecipeModal({ initialRecipe, onSave, onClose }) {
  const isEditing = !!initialRecipe

  const [title, setTitle] = useState(initialRecipe?.title ?? '')
  const [category, setCategory] = useState(initialRecipe?.category ?? '')
  const [selectedIngredients, setSelectedIngredients] = useState(initialRecipe?.ingredients ?? [])
  const [sections, setSections] = useState(
    initialRecipe?.sections?.length ? initialRecipe.sections : [emptySection()]
  )

  const isSelected = (key) => selectedIngredients.some(i => i.key === key)

  const toggleIngredient = (key) => {
    setSelectedIngredients(prev =>
      isSelected(key)
        ? prev.filter(i => i.key !== key)
        : [...prev, { key, amount: '' }]
    )
  }

  const setAmount = (key, amount) => {
    setSelectedIngredients(prev =>
      prev.map(i => i.key === key ? { ...i, amount } : i)
    )
  }

  const updateSection = (i, field, value) => {
    setSections(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s))
  }

  const addSection = () => setSections(prev => [...prev, emptySection()])
  const removeSection = (i) => setSections(prev => prev.filter((_, idx) => idx !== i))

  const handleSave = () => {
    if (!title.trim()) return
    onSave({
      id: initialRecipe?.id ?? Date.now().toString(),
      title: title.trim(),
      category: (category.trim() || 'OTHER').toUpperCase(),
      ingredients: selectedIngredients,
      sections: sections.filter(s => s.body.trim()),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-brown/20 backdrop-blur-sm">
      <div className="bg-cream-100 md:rounded-2xl rounded-t-2xl shadow-xl w-full md:max-w-xl md:mx-4 max-h-[95vh] md:max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-300">
          <h2 className="font-serif text-lg font-medium text-brown">
            {isEditing ? 'Edit Recipe' : 'New Recipe'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-cream-200 text-brown-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-brown-muted mb-1.5">
                Title
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Miso Soup"
                className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-50 text-sm text-brown placeholder:text-brown-muted/50 focus:outline-none focus:border-amber-warm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-brown-muted mb-1.5">
                Category
              </label>
              <input
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. SOUP"
                className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-50 text-sm text-brown placeholder:text-brown-muted/50 focus:outline-none focus:border-amber-warm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-brown-muted mb-2">
              Ingredients
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(INGREDIENT_ICONS).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => toggleIngredient(key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    isSelected(key)
                      ? 'bg-amber-warm/20 border-amber-warm text-brown font-medium'
                      : 'bg-cream-200 border-cream-300 text-brown-soft hover:border-amber-warm/40'
                  }`}
                >
                  <span className="text-sm leading-none">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {selectedIngredients.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-cream-300">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-brown-muted mb-2">Amounts</p>
                {selectedIngredients.map(({ key, amount }) => {
                  const item = INGREDIENT_ICONS[key]
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-sm w-5 text-center">{item.icon}</span>
                      <span className="text-xs text-brown-soft w-24 shrink-0">{item.label}</span>
                      <input
                        value={amount}
                        onChange={e => setAmount(key, e.target.value)}
                        placeholder="e.g. 3 tbsp"
                        className="flex-1 px-2 py-1 rounded-md border border-cream-300 bg-cream-50 text-xs text-brown placeholder:text-brown-muted/40 focus:outline-none focus:border-amber-warm"
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-brown-muted mb-2">
              Sections
            </label>
            <div className="space-y-3">
              {sections.map((section, i) => (
                <div key={i} className="bg-cream-200/60 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      value={section.heading}
                      onChange={e => updateSection(i, 'heading', e.target.value)}
                      placeholder="Section heading (optional)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-cream-300 bg-cream-50 text-sm text-brown placeholder:text-brown-muted/50 focus:outline-none focus:border-amber-warm"
                    />
                    {sections.length > 1 && (
                      <button onClick={() => removeSection(i)} className="p-1 text-brown-muted hover:text-red-400 transition-colors">
                        <Minus size={14} />
                      </button>
                    )}
                  </div>
                  <textarea
                    value={section.body}
                    onChange={e => updateSection(i, 'body', e.target.value)}
                    placeholder="Instructions or notes..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-50 text-sm text-brown placeholder:text-brown-muted/50 focus:outline-none focus:border-amber-warm resize-none"
                  />
                </div>
              ))}
              <button
                onClick={addSection}
                className="flex items-center gap-1.5 text-xs text-amber-warm hover:text-amber-muted transition-colors"
              >
                <Plus size={13} /> Add section
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-cream-300">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-brown-soft hover:bg-cream-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-4 py-2 rounded-lg text-sm bg-amber-warm text-white font-medium hover:bg-amber-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEditing ? 'Save Changes' : 'Save Recipe'}
          </button>
        </div>
      </div>
    </div>
  )
}
