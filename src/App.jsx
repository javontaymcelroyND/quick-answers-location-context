import { useState, useRef, useEffect } from 'react'
import {
  SearchFilled,
  AddFilled,
  SparkleRegular,
  NavigationRegular,
  HomeRegular,
  DocumentRegular,
  DocumentTableRegular,
  FolderRegular,
  FolderOpenRegular,
  ArchiveRegular,
  StarRegular,
  FilterRegular,
  ChevronDownRegular,
  ChevronRightRegular,
  CaretDownRightFilled,
  MailRegular,
  LinkRegular,
  ArrowUploadRegular,
  EditRegular,
  MoreHorizontalRegular,
  SettingsRegular,
  OptionsRegular,
  PinRegular,
  PinFilled,
  DismissRegular,
  DismissCircleRegular,
  ArrowMaximizeRegular,
  HistoryRegular,
  CopyRegular,
  ArrowCounterclockwiseRegular,
  ThumbLikeRegular,
  ThumbDislikeRegular,
  SendRegular,
  SearchSparkleRegular,
  LocationRegular,
  SlideTextSparkleRegular,
  LocationAddRegular,
  CheckmarkRegular,
} from '@fluentui/react-icons'
import './App.css'

// ========== DATA ==========

const navTree = [
  {
    id: 'gtba', label: 'Gamgee Took Brandybuck & Associates', type: 'matter',
    children: [
      {
        id: 'gtba-contracts', label: 'Contracts', type: 'cabinet',
        children: [
          { id: 'gtba-contracts-dummydocs', label: 'DummyDocs', type: 'folder' },
          { id: 'gtba-contracts-correspondence', label: 'Correspondence', type: 'folder' },
          { id: 'gtba-contracts-research', label: 'Research', type: 'folder' },
        ]
      },
      {
        id: 'gtba-litigation', label: 'Litigation', type: 'cabinet',
        children: [
          { id: 'gtba-litigation-pleadings', label: 'Pleadings', type: 'folder' },
          { id: 'gtba-litigation-discovery', label: 'Discovery', type: 'folder' },
          { id: 'gtba-litigation-correspondence', label: 'Correspondence', type: 'folder' },
          { id: 'gtba-litigation-workproduct', label: 'Internal / Work Product', type: 'folder' },
        ]
      },
      {
        id: 'gtba-corporate', label: 'Corporate', type: 'cabinet',
        children: [
          { id: 'gtba-corporate-agreements', label: 'Agreements', type: 'folder' },
          { id: 'gtba-corporate-admin', label: 'Admin / Billing', type: 'folder' },
        ]
      },
    ]
  },
  {
    id: 'meridian', label: 'Meridian Health Systems', type: 'matter',
    children: [
      {
        id: 'meridian-compliance', label: 'Compliance', type: 'cabinet',
        children: [
          { id: 'meridian-compliance-policies', label: 'Policies', type: 'folder' },
          { id: 'meridian-compliance-audits', label: 'Audits', type: 'folder' },
          { id: 'meridian-compliance-correspondence', label: 'Correspondence', type: 'folder' },
        ]
      },
      {
        id: 'meridian-employment', label: 'Employment', type: 'cabinet',
        children: [
          { id: 'meridian-employment-contracts', label: 'Contracts', type: 'folder' },
          { id: 'meridian-employment-disputes', label: 'Disputes', type: 'folder' },
        ]
      },
    ]
  },
  {
    id: 'redstone', label: 'Redstone Urban Properties LLC', type: 'matter',
    children: [
      {
        id: 'redstone-realestate', label: 'Real Estate', type: 'cabinet',
        children: [
          { id: 'redstone-realestate-leases', label: 'Leases', type: 'folder' },
          { id: 'redstone-realestate-closings', label: 'Closings', type: 'folder' },
          { id: 'redstone-realestate-titlework', label: 'Title Work', type: 'folder' },
          { id: 'redstone-realestate-correspondence', label: 'Correspondence', type: 'folder' },
        ]
      },
      {
        id: 'redstone-litigation', label: 'Litigation', type: 'cabinet',
        children: [
          { id: 'redstone-litigation-pleadings', label: 'Pleadings', type: 'folder' },
          { id: 'redstone-litigation-discovery', label: 'Discovery', type: 'folder' },
        ]
      },
    ]
  },
  {
    id: 'apex', label: 'Apex Meridian Consulting Inc', type: 'matter',
    children: [
      {
        id: 'apex-ma', label: 'M&A', type: 'cabinet',
        children: [
          { id: 'apex-ma-duediligence', label: 'Due Diligence', type: 'folder' },
          { id: 'apex-ma-agreements', label: 'Agreements', type: 'folder' },
          { id: 'apex-ma-research', label: 'Research', type: 'folder' },
        ]
      },
      {
        id: 'apex-ip', label: 'Intellectual Property', type: 'cabinet',
        children: [
          { id: 'apex-ip-patents', label: 'Patents', type: 'folder' },
          { id: 'apex-ip-trademarks', label: 'Trademarks', type: 'folder' },
          { id: 'apex-ip-correspondence', label: 'Correspondence', type: 'folder' },
        ]
      },
    ]
  },
  {
    id: 'thornfield', label: 'Thornfield Capital Partners', type: 'matter',
    children: [
      {
        id: 'thornfield-fund', label: 'Fund Formation', type: 'cabinet',
        children: [
          { id: 'thornfield-fund-lpas', label: 'LPAs', type: 'folder' },
          { id: 'thornfield-fund-sideletters', label: 'Side Letters', type: 'folder' },
          { id: 'thornfield-fund-correspondence', label: 'Correspondence', type: 'folder' },
        ]
      },
      {
        id: 'thornfield-regulatory', label: 'Regulatory', type: 'cabinet',
        children: [
          { id: 'thornfield-regulatory-filings', label: 'SEC Filings', type: 'folder' },
          { id: 'thornfield-regulatory-compliance', label: 'Compliance', type: 'folder' },
        ]
      },
    ]
  },
]

// Sample documents for DummyDocs (reused for any folder view)
const dummyDocuments = [
  { name: "A - NDA (copy from ver 1)", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "11/6/2025 9:33 AM" },
  { name: "42_River_Street_Lease", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:40 PM" },
  { name: "77_Broadway_Suite_900_Lease", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:42 PM" },
  { name: "118_Market_Place_Lease", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:40 PM" },
  { name: "250_Kingston_Avenue_Lease", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:42 PM" },
  { name: "LEASE_AGREEMENT_FOR_18_HARBOR_VIEW_DRIVE", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:44 PM" },
  { name: "LEASE_AGREEMENT_FOR_60_PIER_PARKWAY", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:43 PM" },
  { name: "LEASE_AGREEMENT_FOR_312_WILLOW_INDUSTRIAL_WAY", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:44 PM" },
  { name: "LEASE_AGREEMENT_FOR_401_MADISON_PLAZA", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:45 PM" },
  { name: "LEASE_AGREEMENT_FOR_725_OAKRIDGE_PARK", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:45 PM" },
  { name: "LEASE_AGREEMENT_FOR_905_LEXINGTON_ROAD", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 3:43 PM" },
  { name: "NetDocuments Extraction Feb 3 2026", type: "word", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 5:35 PM" },
  { name: "NetDocuments Extraction Feb 3 2026", type: "excel", ver: 1, created: "Javontay McElroy", modified: "Javontay McElroy", date: "2/3/2026 5:35 PM" },
]

// ========== HELPERS ==========

// Find a node by id in the tree
function findNode(tree, id) {
  for (const node of tree) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

// Get breadcrumb path to a node
function getPath(tree, id, path = []) {
  for (const node of tree) {
    if (node.id === id) return [...path, node]
    if (node.children) {
      const found = getPath(node.children, id, [...path, node])
      if (found) return found
    }
  }
  return null
}

// Flatten tree for context search
function flattenTree(tree, result = []) {
  for (const node of tree) {
    result.push(node)
    if (node.children) flattenTree(node.children, result)
  }
  return result
}

// ========== THOUGHT TOGGLE ==========

function ThoughtToggle({ thinkTime }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="thought-toggle">
      <button className="thought-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? <ChevronDownRegular style={{ fontSize: 12 }} /> : <ChevronRightRegular style={{ fontSize: 12 }} />}
        Thought for {thinkTime}s
      </button>
      {expanded && (
        <div className="thought-content">
          No reasoning available — this is a lofi mockup.
        </div>
      )}
    </div>
  )
}

// ========== APP ==========

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null) // null = home
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [searchNdActive, setSearchNdActive] = useState(false)
  const [contextOpen, setContextOpen] = useState(false)
  const [contextChips, setContextChips] = useState([])
  const [contextSearch, setContextSearch] = useState('')
  const [contextFilter, setContextFilter] = useState('all')
  const [aiInput, setAiInput] = useState('')
  const [aiMessages, setAiMessages] = useState([])
  const [expandedSidebar, setExpandedSidebar] = useState({ gtba: true })
  const [sidebarPinned, setSidebarPinned] = useState(false)
  const optionsRef = useRef(null)
  const contextRef = useRef(null)
  const chatRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) setOptionsOpen(false)
      if (contextRef.current && !contextRef.current.contains(e.target)) {
        setContextOpen(false)
        setContextSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [aiMessages])

  const navigate = (id) => setCurrentId(id)
  const goHome = () => setCurrentId(null)

  const currentNode = currentId ? findNode(navTree, currentId) : null
  const breadcrumbPath = currentId ? getPath(navTree, currentId) : null

  const currentLabel = currentNode ? currentNode.label : 'Home'
  const searchPlaceholder = currentNode
    ? `Search ${currentNode.label}${currentNode.children ? ' and subfolders' : ''}`
    : 'Search Contracts'

  // Sidebar toggle
  const toggleExpand = (id) => {
    setExpandedSidebar(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Context popover
  const allNodes = flattenTree(navTree)
  const filteredContextNodes = contextSearch
    ? allNodes.filter(n => n.label.toLowerCase().includes(contextSearch.toLowerCase()))
    : allNodes

  const handleSearchNd = () => { setSearchNdActive(true); setOptionsOpen(false) }
  const removeSearchChip = () => setSearchNdActive(false)
  const handleAddContext = () => { setContextOpen(true); setOptionsOpen(false) }
  const addContextChip = (node) => {
    if (!contextChips.find(c => c.id === node.id)) {
      setContextChips([...contextChips, node])
    }
    setContextOpen(false)
    setContextSearch('')
  }
  const removeContextChip = (id) => setContextChips(contextChips.filter(c => c.id !== id))
  const [aiThinking, setAiThinking] = useState(false)

  const handleSend = () => {
    if (!aiInput.trim()) return
    const locationCtx = searchNdActive ? currentLabel : null
    const addedCtx = contextChips.map(c => c.label)
    const userText = aiInput.trim()
    setAiMessages(prev => [...prev, { role: 'user', text: userText }])
    setAiInput('')
    setContextChips([])
    setAiThinking(true)

    const thinkTime = Math.floor(Math.random() * 4) + 2 // 2-5 seconds
    setTimeout(() => {
      let response = ''
      const loc = locationCtx || 'Home'
      const added = addedCtx.length ? addedCtx.join(', ') : null
      const variant = Math.random() < 0.5 ? 0 : 1
      if (added) {
        if (variant === 0) {
          response = `You're currently in ${loc}. Based on documents here, the relevant provisions address the key terms outlined in your query. I also considered material from ${added}, which suggests a similar clause structure and comparable precedent. That added context appears relevant because it reflects parallel deal terms, but it may reflect a different client, deal stage, or fact pattern.`
        } else {
          response = `Within ${loc}, I found references that address your question directly. I also referenced ${added}, which includes related contractual language and supporting detail. That added context supports the interpretation above, but it should be treated as comparative context, not the source of record for this matter.`
        }
      } else {
        if (variant === 0) {
          response = `You're currently in ${loc}. Based on documents here, the relevant provisions address the key terms outlined in your query. No additional context was provided, so this answer is scoped to the current location only.`
        } else {
          response = `Within ${loc}, I found references that address your question directly. This response is based solely on documents in the current location. You can add context from other matters or folders for a broader analysis.`
        }
      }
      setAiThinking(false)
      setAiMessages(prev => [...prev, { role: 'assistant', text: response, thinkTime }])
    }, thinkTime * 1000)
  }

  // ========== SIDEBAR TREE RENDERER ==========
  const renderSidebarNode = (node, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedSidebar[node.id]
    const isActive = currentId === node.id

    return (
      <div key={node.id}>
        <div
          className={`tree-item ${isActive ? 'active' : ''}`}
          style={{ paddingLeft: 16 + depth * 16 }}
          onClick={() => {
            navigate(node.id)
            if (hasChildren) toggleExpand(node.id)
          }}
        >
          <div className="tree-label">
            {hasChildren
              ? <CaretDownRightFilled className="caret" />
              : <span className="caret" style={{ visibility: 'hidden' }}><CaretDownRightFilled /></span>
            }
            {node.type === 'cabinet' && <ArchiveRegular className="icon" style={{ color: '#4a8fd4' }} />}
            {node.type === 'folder' && <FolderRegular className="icon" style={{ color: '#e8a838' }} />}
            <span className="tree-text">{node.label}</span>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="tree-children-block">
            {node.children.map(child => renderSidebarNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  // ========== CONTEXT TREE RENDERER ==========
  const getFilteredNodes = () => {
    if (contextFilter === 'all') return null // use tree view
    return allNodes.filter(n => n.type === contextFilter)
  }

  const renderContextNode = (node, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const depthClass = `depth-${Math.min(depth, 4)}`

    // If searching, only show matches
    if (contextSearch) {
      const matches = node.label.toLowerCase().includes(contextSearch.toLowerCase())
      const childMatches = hasChildren && node.children.some(c =>
        c.label.toLowerCase().includes(contextSearch.toLowerCase()) ||
        (c.children && c.children.some(gc => gc.label.toLowerCase().includes(contextSearch.toLowerCase())))
      )
      if (!matches && !childMatches) return null
    }

    return (
      <div key={node.id}>
        <button className={`context-item ${depthClass}`} onClick={() => addContextChip(node)}>
          <CaretDownRightFilled className="context-caret" />
          {node.type === 'cabinet' && <ArchiveRegular style={{ color: '#4a8fd4', fontSize: 16, flexShrink: 0 }} />}
          {node.type === 'folder' && <FolderRegular style={{ color: '#e8a838', fontSize: 16, flexShrink: 0 }} />}
          <span className="context-item-name">{node.label}</span>
        </button>
        {hasChildren && node.children.map(child => renderContextNode(child, depth + 1))}
      </div>
    )
  }

  const renderFlatContextItem = (node) => {
    const searchMatch = !contextSearch || node.label.toLowerCase().includes(contextSearch.toLowerCase())
    if (!searchMatch) return null
    return (
      <button key={node.id} className="context-item depth-0" onClick={() => addContextChip(node)}>
        {node.type === 'matter' && <CaretDownRightFilled className="context-caret" />}
        {node.type === 'cabinet' && <ArchiveRegular style={{ color: '#4a8fd4', fontSize: 16, flexShrink: 0 }} />}
        {node.type === 'folder' && <FolderRegular style={{ color: '#e8a838', fontSize: 16, flexShrink: 0 }} />}
        <span className="context-item-name">{node.label}</span>
      </button>
    )
  }

  // ========== CONTENT VIEWS ==========
  const renderContent = () => {
    // Home
    if (!currentNode) {
      return (
        <div className="home-view">
          <div className="home-title">
            <HomeRegular className="home-icon" />
            Home
            <ChevronDownRegular className="chevron" />
          </div>
          <div className="home-columns">
          <div className="home-col">
          <div className="favorites-label">Recent</div>
          <div className="favorites-grid">
            <div className="fav-item" onClick={() => navigate('gtba-litigation-pleadings')}>
              <HistoryRegular className="fav-recent-icon" />
              <FolderRegular style={{ color: '#e8a838', fontSize: 15 }} />
              <span className="fav-name">Pleadings</span>
              <span className="fav-type">Folder</span>
            </div>
            <div className="fav-item" onClick={() => navigate('apex-ma')}>
              <HistoryRegular className="fav-recent-icon" />
              <ArchiveRegular style={{ color: '#4a8fd4', fontSize: 15 }} />
              <span className="fav-name">M&A</span>
              <span className="fav-type">Cabinet</span>
            </div>
            <div className="fav-item" onClick={() => navigate('redstone')}>
              <HistoryRegular className="fav-recent-icon" />
              <span className="fav-name">Redstone Urban Properties LLC</span>
              <span className="fav-type">Matter</span>
            </div>
            <div className="fav-item" onClick={() => navigate('thornfield-regulatory-filings')}>
              <HistoryRegular className="fav-recent-icon" />
              <FolderRegular style={{ color: '#e8a838', fontSize: 15 }} />
              <span className="fav-name">SEC Filings</span>
              <span className="fav-type">Folder</span>
            </div>
            <div className="fav-item" onClick={() => navigate('meridian-employment')}>
              <HistoryRegular className="fav-recent-icon" />
              <ArchiveRegular style={{ color: '#4a8fd4', fontSize: 15 }} />
              <span className="fav-name">Employment</span>
              <span className="fav-type">Cabinet</span>
            </div>
            <div className="fav-item">
              <HistoryRegular className="fav-recent-icon" />
              <DocumentRegular style={{ color: '#2b5797', fontSize: 15 }} />
              <span className="fav-name">77_Broadway_Suite_900_Lease</span>
              <span className="fav-type">Document</span>
            </div>
            <div className="fav-item" onClick={() => navigate('gtba-corporate')}>
              <HistoryRegular className="fav-recent-icon" />
              <ArchiveRegular style={{ color: '#4a8fd4', fontSize: 15 }} />
              <span className="fav-name">Corporate</span>
              <span className="fav-type">Cabinet</span>
            </div>
          </div>
          </div>
          <div className="home-col">
          <div className="favorites-label">Favorite Items</div>
          <div className="favorites-grid">
            <div className="fav-item" onClick={() => navigate('gtba')}>
              <StarRegular className="fav-star" />
              <span className="fav-name">Gamgee Took Brandybuck & Associates</span>
              <span className="fav-type">Matter</span>
            </div>
            <div className="fav-item" onClick={() => navigate('meridian-compliance')}>
              <StarRegular className="fav-star" />
              <ArchiveRegular style={{ color: '#4a8fd4', fontSize: 15 }} />
              <span className="fav-name">Compliance</span>
              <span className="fav-type">Cabinet</span>
            </div>
            <div className="fav-item" onClick={() => navigate('redstone-realestate-leases')}>
              <StarRegular className="fav-star" />
              <FolderRegular style={{ color: '#e8a838', fontSize: 15 }} />
              <span className="fav-name">Leases</span>
              <span className="fav-type">Folder</span>
            </div>
            <div className="fav-item" onClick={() => navigate('apex-ma-duediligence')}>
              <StarRegular className="fav-star" />
              <FolderRegular style={{ color: '#e8a838', fontSize: 15 }} />
              <span className="fav-name">Due Diligence</span>
              <span className="fav-type">Folder</span>
            </div>
            <div className="fav-item">
              <StarRegular className="fav-star" />
              <DocumentRegular style={{ color: '#2b5797', fontSize: 15 }} />
              <span className="fav-name">LEASE_AGREEMENT_FOR_401_MADISON_PLAZA</span>
              <span className="fav-type">Document</span>
            </div>
            <div className="fav-item">
              <StarRegular className="fav-star" />
              <DocumentRegular style={{ color: '#2b5797', fontSize: 15 }} />
              <span className="fav-name">A - NDA (copy from ver 1)</span>
              <span className="fav-type">Document</span>
            </div>
            <div className="fav-item" onClick={() => navigate('thornfield-fund')}>
              <StarRegular className="fav-star" />
              <ArchiveRegular style={{ color: '#4a8fd4', fontSize: 15 }} />
              <span className="fav-name">Fund Formation</span>
              <span className="fav-type">Cabinet</span>
            </div>
            <div className="fav-item">
              <StarRegular className="fav-star" />
              <DocumentTableRegular style={{ color: '#1e7145', fontSize: 15 }} />
              <span className="fav-name">NetDocuments Extraction Feb 3 2026</span>
              <span className="fav-type">Document</span>
            </div>
          </div>
          </div>
          </div>
        </div>
      )
    }

    // Matter — show cabinets
    if (currentNode.type === 'matter') {
      return (
        <div className="home-view">
          <div className="breadcrumb" style={{ padding: '8px 0', marginBottom: 12 }}>
            <a onClick={goHome}>Home</a> &gt; {currentNode.label}
          </div>
          <div className="home-title">
            <span style={{ fontSize: 16 }}>{currentNode.label}</span>
            <ChevronDownRegular className="chevron" />
          </div>
          <div className="favorites-label">Cabinets</div>
          {currentNode.children?.map(cab => (
            <div className="tree-item" key={cab.id} onClick={() => navigate(cab.id)} style={{ padding: '8px 0' }}>
              <div className="tree-label">
                <ArchiveRegular className="icon" style={{ color: '#4a8fd4' }} />
                <span className="tree-text" style={{ color: '#1a6bc4', cursor: 'pointer' }}>{cab.label}</span>
              </div>
            </div>
          ))}
        </div>
      )
    }

    // Cabinet — show folders
    if (currentNode.type === 'cabinet') {
      return (
        <div className="home-view">
          <div className="breadcrumb" style={{ padding: '8px 0', marginBottom: 12 }}>
            <a onClick={goHome}>Home</a>
            {breadcrumbPath?.slice(0, -1).map(p => (
              <span key={p.id}> &gt; <a onClick={() => navigate(p.id)}>{p.label}</a></span>
            ))}
            {' '}&gt; {currentNode.label}
          </div>
          <div className="home-title">
            <ArchiveRegular className="home-icon" style={{ color: '#4a8fd4' }} />
            {currentNode.label}
            <ChevronDownRegular className="chevron" />
          </div>
          <div className="favorites-label">Folders</div>
          {currentNode.children?.map(fld => (
            <div className="tree-item" key={fld.id} onClick={() => navigate(fld.id)} style={{ padding: '8px 0' }}>
              <div className="tree-label">
                <FolderRegular className="icon" style={{ color: '#e8a838' }} />
                <span className="tree-text" style={{ color: '#1a6bc4', cursor: 'pointer' }}>{fld.label}</span>
              </div>
            </div>
          ))}
        </div>
      )
    }

    // Folder — show documents
    return (
      <div className="folder-view active">
        <div className="breadcrumb">
          <a onClick={goHome}>Home</a>
          {breadcrumbPath?.slice(0, -1).map(p => (
            <span key={p.id}> &gt; <a onClick={() => navigate(p.id)}>{p.label}</a></span>
          ))}
          {' '}&gt; {currentNode.label}
        </div>
        <div className="folder-header">
          <StarRegular style={{ color: '#ccc', fontSize: 18, cursor: 'pointer' }} />
          <FolderOpenRegular style={{ color: '#e8a838', fontSize: 30 }} />
          <h2>{currentNode.label}</h2>
          <ChevronDownRegular style={{ fontSize: 12, color: '#666' }} />
        </div>
        <div className="folder-meta">
          <FilterRegular className="filter-icon" />
          <span>{dummyDocuments.length} items | 0 selected</span>
        </div>
        <div className="folder-toolbar">
          <a><SparkleRegular /> Ask AI</a>
          <a><MailRegular /> Email copy</a>
          <a><LinkRegular /> Email link</a>
          <a><ArrowUploadRegular /> Upload new version</a>
          <a><EditRegular /> Edit profile</a>
          <a><MoreHorizontalRegular /> More</a>
          <span className="spacer" />
          <SettingsRegular className="gear" />
        </div>
        <div className="doc-table">
          <table>
            <thead>
              <tr>
                <th className="check-col"><input type="checkbox" /></th>
                <th className="star-col"></th>
                <th className="doc-icon-cell"></th>
                <th>Name &#8593;</th>
                <th>Total Versions</th>
                <th>Created by</th>
                <th>Last modified by</th>
                <th>Last modified date</th>
              </tr>
            </thead>
            <tbody>
              {dummyDocuments.map((doc, i) => (
                <tr key={i}>
                  <td className="check-col"><input type="checkbox" /></td>
                  <td className="star-col"><StarRegular /></td>
                  <td className="doc-icon-cell">
                    {doc.type === 'excel'
                      ? <DocumentTableRegular style={{ color: '#1e7145', fontSize: 16 }} />
                      : <DocumentRegular style={{ color: '#2b5797', fontSize: 16 }} />
                    }
                  </td>
                  <td><span className="doc-name">{doc.name}</span></td>
                  <td><span className="ver-badge">{doc.ver}</span></td>
                  <td>{doc.created}</td>
                  <td>{doc.modified}</td>
                  <td>{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="app-frame">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="logo">
          <b>net</b>documents<span className="dot">*</span>
          <span className="env">lab</span>
        </div>
        <div className="search-group">
          <div className="search-area">
            <div className="search-input-wrap">
              <ChevronDownRegular className="search-caret" />
              <input className="search-input" type="text" placeholder={searchPlaceholder} />
            </div>
            <button className="search-dots"><MoreHorizontalRegular /></button>
            <button className="search-btn"><SearchFilled /></button>
          </div>
          <button className="btn-add"><AddFilled /> Add</button>
          <button className="btn-ask-ai" onClick={() => setAiOpen(!aiOpen)}>
            <SparkleRegular style={{ fontSize: 24 }} /> Ask AI
          </button>
        </div>
        <div className="topbar-right">
          <span className="user-greeting">Hi, Javontay <ChevronDownRegular style={{ fontSize: 10 }} /></span>
        </div>
      </div>

      {/* NAV TABS */}
      <div className="navtabs">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <NavigationRegular />
        </button>
        <a href="#" className="active">DOCUMENTS</a>
        <a href="#">MY TASKS</a>
        <a href="#">APPS</a>
      </div>

      {/* MAIN */}
      <div className="main">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen || sidebarPinned ? 'open' : ''}`}>
          <div className="sidebar-header">
            NAVIGATION
            {sidebarPinned
              ? <PinFilled className="pin pinned" title="Unpin sidebar" onClick={() => setSidebarPinned(false)} />
              : <PinRegular className="pin" title="Pin sidebar" onClick={() => { setSidebarPinned(true); setSidebarOpen(true) }} />
            }
          </div>
          <div className="tree">
            {navTree.map(node => renderSidebarNode(node, 0))}
            <div className="tree-add">+ Add top-level folder</div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {renderContent()}
        </div>

        {/* AI Panel */}
        <div className={`ai-panel ${aiOpen ? 'open' : ''}`}>
          <div className="ai-panel-inner">
            <div className="ai-panel-header">
              <NavigationRegular className="hamburger-ai" />
              <span className="title">Madison Plaza Lease Agreeme...</span>
              <div className="panel-actions">
                <button title="History"><HistoryRegular /></button>
                <button title="Expand"><ArrowMaximizeRegular /></button>
                <button title="Close" onClick={() => setAiOpen(false)}><DismissRegular /></button>
              </div>
            </div>
            <div className="ai-chat" ref={chatRef}>
              <div className="ai-msg-user">
                What is the lease agreement of the madison plaza about?
              </div>
              <div className="ai-msg-assistant">
                <div className="reasoning">
                  Reasoning summary <ChevronDownRegular style={{ fontSize: 12 }} />
                </div>
                <p>The "Madison Plaza" lease agreement is a commercial lease for office premises located at 401 Madison Plaza, New York, NY 10022. It is between:</p>
                <ul>
                  <li><strong>Landlord:</strong> Redstone Urban Properties LLC</li>
                  <li><strong>Tenant:</strong> Apex Meridian Consulting Inc <span className="cite">1</span>.</li>
                </ul>
                <p>Key points:</p>
                <ul>
                  <li><strong>Type of agreement:</strong> Commercial lease of the entire premises (with all improvements) at 401 Madison Plaza. <span className="cite">1</span></li>
                  <li><strong>Initial term:</strong> From September 15, 2025 (Commencement Date) to September 14, 2030. <span className="cite">1</span></li>
                  <li><strong>Renewal options:</strong> Tenant can renew for <strong>two additional five-year terms</strong> by giving written notice at least 180 days before the end of the initial term or any renewal term. <span className="cite">1</span></li>
                  <li><strong>Base rent:</strong> 101,000 USD per month, payable in advance on the first day of each month. <span className="cite">1</span></li>
                  <li><strong>Additional rent:</strong> Tenant must also pay other amounts required under the lease as "Additional Rent" (e.g., typically operating costs, taxes, etc., though those details would be in the full lease). <span className="cite">1</span></li>
                </ul>
                <p>A summary table in another document confirms these key data points: address, agreement date (August 22, 2025), term dates, monthly rent, landlord, and tenant. <span className="cite">2</span> <span className="cite">3</span></p>
                <p>If you'd like, I can next summarize likely obligations in more detail (e.g., typical maintenance, insurance, default/termination concepts) based on the type of lease this is.</p>
              </div>
              <div className="ai-feedback">
                <button title="Copy"><CopyRegular /></button>
                <button title="Retry"><ArrowCounterclockwiseRegular /></button>
                <button title="Like"><ThumbLikeRegular /></button>
                <button title="Dislike"><ThumbDislikeRegular /></button>
              </div>
              {aiMessages.map((msg, i) => (
                msg.role === 'user'
                  ? <div key={i} className="ai-msg-user">{msg.text}</div>
                  : <div key={i} className="ai-msg-assistant">
                      <ThoughtToggle thinkTime={msg.thinkTime} />
                      <p>{msg.text}</p>
                    </div>
              ))}
              {aiThinking && (
                <div className="ai-thinking">
                  <SparkleRegular className="thinking-sparkle" />
                  <span>Thinking</span>
                  <span className="thinking-dots" />
                </div>
              )}
            </div>
            <div className="ai-input-area">
              <div className="ai-file-bar">
                <span className="files-label"><DocumentRegular /> 0 files</span>
                {searchNdActive && (
                  <div className="search-context-wrap">
                    <span className="search-context-label">
                      <LocationRegular style={{ fontSize: 14 }} />
                      Context:
                    </span>
                    <div className="search-chip" title={breadcrumbPath ? breadcrumbPath.map(p => p.label).join(' > ') : currentLabel}>
                      {currentNode?.type === 'cabinet' && <ArchiveRegular style={{ fontSize: 14, color: '#4a8fd4', flexShrink: 0 }} />}
                      {currentNode?.type === 'folder' && <FolderRegular style={{ fontSize: 14, color: '#e8a838', flexShrink: 0 }} />}
                      <span className="search-chip-label">{currentLabel}</span>
                      <button className="chip-dismiss" onClick={removeSearchChip}>
                        <DismissRegular style={{ fontSize: 12 }} />
                      </button>
                    </div>
                  </div>
                )}
                <button className="prompts-btn"><SlideTextSparkleRegular /> Prompts</button>
              </div>
              <div className="ai-input-wrap">
                <div className="chip-row">
                  {contextChips.map(chip => (
                    <div className="context-chip" key={chip.id}>
                      {chip.type === 'cabinet' && <ArchiveRegular style={{ fontSize: 14, color: '#4a8fd4' }} />}
                      {chip.type === 'folder' && <FolderRegular style={{ fontSize: 14, color: '#e8a838' }} />}
                      <span>{chip.label}</span>
                      <button className="chip-dismiss" onClick={() => removeContextChip(chip.id)}>
                        <DismissCircleRegular style={{ fontSize: 14 }} />
                      </button>
                    </div>
                  ))}
                </div>
                <textarea
                  placeholder="Ask a question or provide instructions on a task you want to perform"
                  rows={2}
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <div className="ai-input-bottom-row">
                  <div className="options-anchor" ref={optionsRef}>
                    <button className="icon-btn" title="Options" onClick={() => setOptionsOpen(!optionsOpen)}>
                      <OptionsRegular />
                    </button>
                    {optionsOpen && (
                      <div className="options-popover">
                        <button className="options-item" onClick={handleSearchNd}>
                          <SearchSparkleRegular style={{ fontSize: 18 }} />
                          Search NetDocuments
                          {searchNdActive && <CheckmarkRegular style={{ marginLeft: 'auto', fontSize: 16, color: '#1a6bc4' }} />}
                        </button>
                        <button className="options-item" onClick={handleAddContext}>
                          <LocationAddRegular style={{ fontSize: 18 }} />
                          Add context
                        </button>
                      </div>
                    )}
                    {contextOpen && (
                      <div className="context-popover" ref={contextRef}>
                        <div className="context-sticky-header">
                          <div className="context-search-wrap">
                            <input
                              className="context-search-input"
                              type="text"
                              placeholder="Search..."
                              value={contextSearch}
                              onChange={(e) => setContextSearch(e.target.value)}
                              autoFocus
                            />
                          </div>
                          <div className="context-filters">
                            {['all', 'matter', 'cabinet', 'folder'].map(f => (
                              <button
                                key={f}
                                className={`context-filter-chip ${contextFilter === f ? 'active' : ''}`}
                                onClick={() => setContextFilter(f)}
                              >
                                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="context-tree">
                          {contextFilter === 'all'
                            ? navTree.map(node => renderContextNode(node, 0))
                            : getFilteredNodes().map(node => renderFlatContextItem(node))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="input-spacer" />
                  <div className="think-toggle">
                    Think longer
                    <div className="toggle"><div className="knob" /></div>
                  </div>
                  <button className={`send-btn ${aiInput.trim() ? 'active' : ''}`} onClick={handleSend}><SendRegular /></button>
                </div>
              </div>
              <div className="ai-disclaimer">
                AI responses can contain mistakes. Review carefully.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="page-footer">
        Copyright &copy; 1996-2026 NetDocuments Software Inc. All rights reserved. |{' '}
        <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a>
      </div>
      <div className="lofi-note">Lofi Mockup &mdash; Quick Answers &amp; Location Context</div>
    </div>
  )
}

export default App
