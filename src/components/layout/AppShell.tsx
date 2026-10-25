import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { ROLE_NAVIGATION } from '../../lib/navigation';
import { DEMO_USERS } from '../../lib/demo-users';
import { LucideIcon } from '../common/LucideIcon';
import { NivaranBrand } from '../common/NivaranBrand';
import {
  Bell,
  LogOut,
  ChevronDown,
  RotateCcw,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  Info,
  FolderOpen,
} from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, loginAs, notifications, appCase, cases, selectedCaseId, selectCase, resetDemoState, markNotificationRead } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [docketMenuOpen, setDocketMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!currentUser) return null;

  const navItems = ROLE_NAVIGATION[currentUser.role] || [];
  const unreadNotifs = notifications.filter((n) => !n.read);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
      case 'REJECTED':
        return 'bg-rose-950/60 text-rose-300 border-rose-500/40';
      case 'CLARIFICATION_REQUIRED':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/40';
      case 'UNDER_SCRUTINY':
        return 'bg-blue-950/60 text-blue-300 border-blue-500/40';
      case 'SCRUTINY_COMPLETED':
        return 'bg-teal-950/60 text-teal-300 border-teal-500/40';
      default:
        return 'bg-slate-900/80 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-800">
      {/* Tricolor institutional strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#D97706] via-white to-[#4DBB99] shrink-0" />

      {/* Main Institutional Header */}
      <header className="bg-[#0F294A] text-white border-b border-slate-700/80 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand zone */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-300 hover:text-white rounded"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="text-white group">
              <NivaranBrand compact />
            </Link>
          </div>

          {/* Center: Active Docket Switcher */}
          <div className="hidden lg:block relative">
            <button
              onClick={() => setDocketMenuOpen(!docketMenuOpen)}
              className="flex items-center gap-2 bg-[#0A1D36] hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs transition-colors"
              title="Switch active docket"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-slate-400">Docket:</span>
              <span className="font-mono font-semibold text-white">{appCase.id}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 truncate max-w-[180px]">{appCase.institutionName}</span>
              <span className="text-slate-500">·</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(appCase.status)}`}>
                {appCase.status.replace(/_/g, ' ')}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
            </button>

            {docketMenuOpen && (
              <div className="absolute left-0 mt-2 w-[540px] bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 text-slate-800">
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Active Demo Docket — Switch Case Study
                  </span>
                  <span className="text-[10px] text-slate-400">2 cases loaded</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {cases.map((c) => {
                    const isActive = c.id === selectedCaseId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          selectCase(c.id);
                          setDocketMenuOpen(false);
                          navigate('/regional/dashboard');
                        }}
                        className={`w-full text-left px-3 py-3 text-xs hover:bg-slate-50 transition-colors ${
                          isActive ? 'bg-blue-50/80' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isActive ? 'bg-[#0F294A] text-amber-400' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <FolderOpen className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-bold text-slate-900 text-[11px]">{c.id}</span>
                              {isActive && (
                                <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-semibold">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <div className="font-semibold text-slate-800 mt-0.5 truncate">{c.institutionName}</div>
                            <div className="text-slate-500 text-[11px] mt-0.5">{c.programme}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(c.status)}`}>
                                {c.status.replace(/_/g, ' ')}
                              </span>
                              <span className="text-[10px] text-slate-400">{c.category}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right zone: Switch Role, Notifications, User profile */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#0A1D36] hover:bg-slate-800 text-xs text-white rounded-lg border border-slate-700 transition-colors shadow-xs"
                title="Switch simulated demo role"
              >
                <span className="text-amber-400 font-serif font-bold text-xs">RBAC</span>
                <span className="font-medium truncate max-w-[120px] sm:max-w-[160px]">
                  {currentUser.roleLabel}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 text-slate-800">
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Switch Demo Role (9 RBAC Personas)
                    </span>
                    <span className="text-[10px] text-slate-400">Local Session</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {DEMO_USERS.map((user) => {
                      const isActive = user.id === currentUser.id;
                      return (
                        <button
                          key={user.id}
                          onClick={() => {
                            loginAs(user.id);
                            setRoleMenuOpen(false);
                            navigate(user.dashboardRoute);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs flex items-start gap-2.5 hover:bg-slate-50 transition-colors ${
                            isActive ? 'bg-blue-50/80 font-semibold' : ''
                          }`}
                        >
                          <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${user.badgeColor}`}>
                            {user.avatarInitial}
                          </div>
                          <div className="truncate flex-1">
                            <div className="text-slate-900 font-medium flex items-center justify-between">
                              <span>{user.name}</span>
                              {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">{user.roleLabel}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Outbox / Inbox */}
            <div className="relative">
              <button
                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>

              {notifMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 text-slate-800">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Notifications & Dispatch</span>
                    <span className="text-[11px] text-slate-500">{notifications.length} alerts</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.linkRoute) {
                            setNotifMenuOpen(false);
                            navigate(n.linkRoute);
                          }
                        }}
                        className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                          !n.read ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-1 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Demo State Action */}
            <button
              onClick={() => {
                if (window.confirm('Reset simulated demo state back to seeded initial records?')) {
                  resetDemoState();
                  navigate('/regional/dashboard');
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg text-xs transition-colors border border-transparent hover:border-slate-700"
              title="Reset state to initial seed"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset Demo</span>
            </button>

            {/* Sign Out / Exit session */}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 border border-rose-800/40 rounded-lg text-xs font-medium transition-colors"
              title="Sign Out of Simulated Demo Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="bg-[#0A1D36] border-t border-slate-800 py-1 px-4 text-center text-[11px] text-amber-200/90 font-medium">
          Independent implementation prototype. Not an official AICTE or Government of India service. Automated outputs support human review.
        </div>
      </header>

      {/* App Body: Dynamic Role Sidebar + Main Content Viewport */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto pb-16">
        {/* Dynamic Sidebar */}
        <aside
          className={`w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between fixed md:sticky top-[102px] h-[calc(100vh-102px)] z-20 transition-transform duration-200 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* User Role Card inside sidebar */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${currentUser.badgeColor} border`}>
                {currentUser.avatarInitial}
              </div>
              <div className="truncate flex-1">
                <div className="font-semibold text-slate-900 text-xs truncate">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {currentUser.designation}
                </div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Jurisdiction:</span>
              <span className="text-slate-800 font-medium truncate max-w-[120px]" title={currentUser.jurisdiction}>
                {currentUser.jurisdiction.split('—')[0]}
              </span>
            </div>
          </div>

          {/* Navigation Items strictly for current role */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {currentUser.roleLabel} Workspace
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-[#0F294A] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <LucideIcon
                      name={item.iconName}
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-800'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar bottom: RBAC Security Notice */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Shield className="w-3.5 h-3.5 text-blue-700" />
              <span>Simulated RBAC Boundary</span>
            </div>
            <p className="text-[10px] leading-tight text-slate-500">
              Only features permitted for {currentUser.roleLabel} are rendered.
            </p>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
