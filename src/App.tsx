import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './lib/state/AppContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AppShell } from './components/layout/AppShell';
import { RouteGuard } from './components/layout/RouteGuard';

// Workspaces
import { RegionalWorkspace } from './pages/regional/RegionalWorkspace';
import { ReviewerWorkspace } from './pages/reviewer/ReviewerWorkspace';
import { InstitutionWorkspace } from './pages/institution/InstitutionWorkspace';
import { VerifierWorkspace } from './pages/verifier/VerifierWorkspace';
import { EvcWorkspace } from './pages/evc/EvcWorkspace';
import { DecisionWorkspace } from './pages/decision/DecisionWorkspace';
import { WorkflowAdminWorkspace } from './pages/workflow/WorkflowAdminWorkspace';
import { AuditorWorkspace } from './pages/auditor/AuditorWorkspace';
import { SystemAdminWorkspace } from './pages/sysadmin/SystemAdminWorkspace';

function AppRoutes() {
  const { currentUser } = useApp();

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Role 1: Regional Officer */}
      <Route
        path="/regional/*"
        element={
          <RouteGuard>
            <AppShell>
              <RegionalWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Role 2: Scrutiny Reviewer */}
      <Route
        path="/reviewer/*"
        element={
          <RouteGuard>
            <AppShell>
              <ReviewerWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Role 3: Institution Representative */}
      <Route
        path="/institution/*"
        element={
          <RouteGuard>
            <AppShell>
              <InstitutionWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Role 4: Document Verifier */}
      <Route
        path="/verifier/*"
        element={
          <RouteGuard>
            <AppShell>
              <VerifierWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Role 5: EVC Coordinator */}
      <Route
        path="/evc/*"
        element={
          <RouteGuard>
            <AppShell>
              <EvcWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Role 6: Committee / Decision Authority */}
      <Route
        path="/decision/*"
        element={
          <RouteGuard>
            <AppShell>
              <DecisionWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Role 7: Workflow Administrator */}
      <Route
        path="/workflow-admin/*"
        element={
          <RouteGuard>
            <AppShell>
              <WorkflowAdminWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Role 8: Independent Auditor (Strictly Read-Only) */}
      <Route
        path="/auditor/*"
        element={
          <RouteGuard>
            <AppShell>
              <AuditorWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Role 9: System Administrator */}
      <Route
        path="/system-admin/*"
        element={
          <RouteGuard>
            <AppShell>
              <SystemAdminWorkspace />
            </AppShell>
          </RouteGuard>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          currentUser ? (
            <Navigate to={currentUser.dashboardRoute} replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
