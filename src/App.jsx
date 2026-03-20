import { useState } from 'react'
import {
  SearchRegular,
  AddRegular,
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
  MailRegular,
  LinkRegular,
  ArrowUploadRegular,
  EditRegular,
  MoreHorizontalRegular,
  SettingsRegular,
  PinRegular,
  DismissRegular,
  ArrowMaximizeRegular,
  HistoryRegular,
  CopyRegular,
  ArrowCounterclockwiseRegular,
  ThumbLikeRegular,
  ThumbDislikeRegular,
  SendRegular,
} from '@fluentui/react-icons'
import './App.css'

const documents = [
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [view, setView] = useState('home')
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search Contracts')

  const goHome = () => {
    setView('home')
    setSearchPlaceholder('Search Contracts')
  }

  const openFolder = () => {
    setView('dummydocs')
    setSearchPlaceholder('Search DummyDocs and subfolders')
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
              <input
                className="search-input"
                type="text"
                placeholder={searchPlaceholder}
              />
            </div>
            <button className="search-dots"><MoreHorizontalRegular /></button>
            <button className="search-btn"><SearchRegular /></button>
          </div>
          <button className="btn-add"><AddRegular /> Add</button>
          <button className="btn-ask-ai" onClick={() => setAiOpen(!aiOpen)}>
            <SparkleRegular /> Ask AI
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
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            NAVIGATION
            <PinRegular className="pin" title="Pin sidebar" />
          </div>
          <div className="tree">
            <div className="tree-item">
              <div className="tree-label">
                <ChevronDownRegular className="caret" />
                <span className="tree-text">Gamgee Took Brandybuck &amp; Associates</span>
              </div>
            </div>
            <div className="tree-children">
              <div className="tree-item active" onClick={goHome}>
                <div className="tree-label">
                  <ChevronDownRegular className="caret" />
                  <ArchiveRegular className="icon" style={{ color: '#4a8fd4' }} />
                  <span className="tree-text">Contracts</span>
                </div>
              </div>
              <div className="tree-children">
                <div className="tree-item" onClick={openFolder}>
                  <div className="tree-label">
                    <span className="caret" style={{ visibility: 'hidden' }}><ChevronRightRegular /></span>
                    <FolderRegular className="icon" style={{ color: '#e8a838' }} />
                    <span className="tree-text">DummyDocs</span>
                  </div>
                </div>
              </div>
              <div className="tree-add">+ Add top-level folder</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* Home View */}
          {view === 'home' && (
            <div className="home-view">
              <div className="home-title">
                <HomeRegular className="home-icon" />
                Home
                <ChevronDownRegular className="chevron" />
              </div>
              <div className="favorites-label">Favorite Items</div>
              <div className="favorites-drop">Drag item here</div>
            </div>
          )}

          {/* Folder View */}
          {view === 'dummydocs' && (
            <div className="folder-view active">
              <div className="breadcrumb">
                <a onClick={goHome}>Home</a> &gt;{' '}
                <a onClick={goHome}>Contracts</a> &gt; DummyDocs
              </div>
              <div className="folder-header">
                <StarRegular style={{ color: '#ccc', fontSize: 18, cursor: 'pointer' }} />
                <FolderOpenRegular style={{ color: '#e8a838', fontSize: 30 }} />
                <h2>DummyDocs</h2>
                <ChevronDownRegular style={{ fontSize: 12, color: '#666' }} />
              </div>
              <div className="folder-meta">
                <FilterRegular className="filter-icon" />
                <span>13 items | 0 selected</span>
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
                    {documents.map((doc, i) => (
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
          )}
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
            <div className="ai-chat">
              <div className="ai-msg-user">
                What is the lease agreement of the madison plaza about?
              </div>
              <div className="ai-msg-assistant">
                <div className="reasoning">
                  Reasoning summary <ChevronDownRegular style={{ fontSize: 12 }} />
                </div>
                <p>
                  The "Madison Plaza" lease agreement is a commercial lease for office
                  premises located at 401 Madison Plaza, New York, NY 10022. It is between:
                </p>
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
                <p>
                  A summary table in another document confirms these key data points: address, agreement date (August 22, 2025), term dates, monthly rent, landlord, and tenant. <span className="cite">2</span> <span className="cite">3</span>
                </p>
                <p>
                  If you'd like, I can next summarize likely obligations in more detail
                  (e.g., typical maintenance, insurance, default/termination concepts)
                  based on the type of lease this is.
                </p>
              </div>
              <div className="ai-feedback">
                <button title="Copy"><CopyRegular /></button>
                <button title="Retry"><ArrowCounterclockwiseRegular /></button>
                <button title="Like"><ThumbLikeRegular /></button>
                <button title="Dislike"><ThumbDislikeRegular /></button>
              </div>
            </div>
            <div className="ai-input-area">
              <div className="ai-file-bar">
                <span className="files-label"><DocumentRegular /> 0 files</span>
                <button className="prompts-btn"><SettingsRegular /> Prompts</button>
              </div>
              <div className="ai-input-wrap">
                <textarea
                  placeholder="Ask a question or provide instructions on a task you want to perform"
                  rows={2}
                />
                <button className="send-btn"><SendRegular /></button>
              </div>
              <div className="ai-input-footer">
                <SettingsRegular className="settings-icon" />
                <div className="think-toggle">
                  Think longer
                  <div className="toggle"><div className="knob" /></div>
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
