import React from 'react';
import { Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../lib/state/AppContext';
import { canAccessRoute } from '../../lib/permissions';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { DEMO_USERS } from '../../lib/demo-users';

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { currentUser, loginAs } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check route jurisdiction
  const isAllowed = canAccessRoute(currentUser, location.pathname);

  if (!isAllowed) {
    // Find which role is authorized for this namespace
    let expectedRoleTitle = 'Authorized Administrative Role';
    let targetDemoUserId = '';

    if (location.pathname.startsWith('/regional')) {
      expectedRoleTitle = 'Regional Officer / Intake (Rajesh Sharma)';
      targetDemoUserId = 'user-regional';
    } else if (location.pathname.startsWith('/reviewer')) {
      expectedRoleTitle = 'Scrutiny Reviewer (Dr. Arvind Joshi)';
      targetDemoUserId = 'user-reviewer';
    } else if (location.pathname.startsWith('/institution')) {
      expectedRoleTitle = 'Institution Representative (Prof. Sunita Patil)';
      targetDemoUserId = 'user-institution';
    } else if (location.pathname.startsWith('/verifier')) {
      expectedRoleTitle = 'Document Verifier (Meera Deshmukh)';
      targetDemoUserId = 'user-verifier';
    } else if (location.pathname.startsWith('/evc')) {
      expectedRoleTitle = 'EVC Coordinator (Sanjeev Rao)';
      targetDemoUserId = 'user-evc';
    } else if (location.pathname.startsWith('/decision')) {
      expectedRoleTitle = 'Committee / Decision Authority (Demo Committee Representative)';
      targetDemoUserId = 'user-decision';
    } else if (location.pathname.startsWith('/workflow-admin')) {
      expectedRoleTitle = 'Workflow Administrator (Ananya Roy)';
      targetDemoUserId = 'user-workflow';
    } else if (location.pathname.startsWith('/auditor')) {
      expectedRoleTitle = 'Independent Auditor (Independent Demo Auditor)';
      targetDemoUserId = 'user-auditor';
    } else if (location.pathname.startsWith('/system-admin')) {
      expectedRoleTitle = 'System Administrator (Vikram Sen)';
      targetDemoUserId = 'user-sysadmin';
    }

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg max-w-xl w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto border border-rose-200">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              Access Restricted · RBAC Security Boundary
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-3">
              Unauthorized Route Jurisdiction
            </h2>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Your active simulated session is authenticated as{' '}
              <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.roleLabel}).
              This route requires the regulatory jurisdiction of{' '}
              <strong className="text-slate-900">{expectedRoleTitle}</strong>.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-left text-slate-600 space-y-1 font-mono">
            <div><span className="text-slate-400">Attempted Route:</span> {location.pathname}</div>
            <div><span className="text-slate-400">Active Jurisdiction:</span> {currentUser.jurisdiction}</div>
            <div><span className="text-slate-400">Permitted Action:</span> ACCESS_DENIED (Strict Role-Isolated Architecture)</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to={currentUser.dashboardRoute}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#0F294A] hover:bg-[#0A1D36] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to My Authorized Dashboard</span>
            </Link>

            {targetDemoUserId && (
              <button
                onClick={() => {
                  loginAs(targetDemoUserId);
                  navigate(location.pathname);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Switch to {expectedRoleTitle.split('(')[0]}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
