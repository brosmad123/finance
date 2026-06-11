import React from 'react';
import HeroSection from '@/components/budget/HeroSection';
import AllocationBar from '@/components/budget/AllocationBar';
import IncomeBreakdown from '@/components/budget/IncomeBreakdown';
import LedgerTable from '@/components/budget/LedgerTable';
import FreeResources from '@/components/budget/FreeResources';
import CashFlowSummary from '@/components/budget/CashFlowSummary';
import BudgetBalancerGame from '@/components/budget/BudgetBalancerGame';
import Footer from '@/components/budget/Footer';
import { NEEDS, HYGIENE, FOOD_LIFE, WANTS, calcSubtotal } from '@/lib/budgetData';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div id="hero">
        <HeroSection />
      </div>

      <div id="allocation">
        <AllocationBar />
      </div>

      <div id="income">
        <IncomeBreakdown />
      </div>

      <div id="ledger" className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-data text-muted-foreground mb-2">Every expense, listed out</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              The full spending list
            </h2>
          </div>

          <LedgerTable
            title="Essential Needs"
            subtitle="Monthly non-negotiable expenses"
            icon="🏠"
            items={NEEDS}
            subtotal={calcSubtotal(NEEDS)}
          />
          <LedgerTable
            title="Hygiene & Personal Care"
            subtitle="Monthly consumables for health & grooming"
            icon="🧴"
            items={HYGIENE}
            subtotal={calcSubtotal(HYGIENE)}
          />
          <LedgerTable
            title="Food & Daily Life"
            subtitle="Consumables & everyday items"
            icon="☕"
            items={FOOD_LIFE}
            subtotal={calcSubtotal(FOOD_LIFE)}
          />
          <LedgerTable
            title="Wants & Subscriptions"
            subtitle="Lifestyle & discretionary spending"
            icon="🎯"
            items={WANTS}
            subtotal={calcSubtotal(WANTS)}
          />
        </div>
      </div>

      <div id="free">
        <FreeResources />
      </div>

      <div id="summary">
        <CashFlowSummary />
      </div>

      <div id="game">
        <BudgetBalancerGame />
      </div>

      <Footer />
    </div>
  );
}