/**
 * Responsive Example Component
 * 
 * This component demonstrates how to use the new responsive utilities
 * and hooks introduced in Phase 1.
 * 
 * You can use this as a reference when building new components or
 * updating existing ones for better responsive behavior.
 */

import { useBreakpoint, useIsMobile, useIsTablet, useIsDesktop, useIsTouchDevice } from '@/hooks/use-breakpoint'

export function ResponsiveExample() {
  // Get current breakpoint and device type
  const { breakpoint, deviceType } = useBreakpoint()
  
  // Get specific device type boolean
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const isTouch = useIsTouchDevice()

  return (
    <div className="container-mobile-first spacing-mobile md:spacing-tablet lg:spacing-desktop">
      {/* Page Header - Responsive Typography */}
      <header className="mb-8">
        <h1 className="text-responsive-3xl text-brand-reflex-blue mb-4">
          Responsive Design Example
        </h1>
        <p className="text-responsive-base text-brand-reflex-blue/70">
          This component demonstrates Phase 1 responsive utilities
        </p>
      </header>

      {/* Device Info Card */}
      <div className="card-responsive bg-brand-pms-290/20 mb-8">
        <h2 className="text-responsive-xl text-brand-reflex-blue mb-4">
          Current Device Info
        </h2>
        <dl className="space-y-2">
          <div>
            <dt className="font-semibold text-brand-reflex-blue inline">Breakpoint:</dt>
            <dd className="inline ml-2 text-brand-pms-285">{breakpoint}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-reflex-blue inline">Device Type:</dt>
            <dd className="inline ml-2 text-brand-pms-285">{deviceType}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-reflex-blue inline">Is Mobile:</dt>
            <dd className="inline ml-2 text-brand-pms-285">{isMobile ? 'Yes' : 'No'}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-reflex-blue inline">Is Tablet:</dt>
            <dd className="inline ml-2 text-brand-pms-285">{isTablet ? 'Yes' : 'No'}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-reflex-blue inline">Is Desktop:</dt>
            <dd className="inline ml-2 text-brand-pms-285">{isDesktop ? 'Yes' : 'No'}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-reflex-blue inline">Touch Device:</dt>
            <dd className="inline ml-2 text-brand-pms-285">{isTouch ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </div>

      {/* Conditional Rendering Examples */}
      <section className="mb-8">
        <h2 className="text-responsive-xl text-brand-reflex-blue mb-4">
          Conditional Rendering
        </h2>
        
        {isMobile && (
          <div className="card-responsive bg-brand-pms-129/20">
            <p className="text-responsive-base">
              📱 This content only shows on mobile devices (&lt; 768px)
            </p>
          </div>
        )}
        
        {isTablet && (
          <div className="card-responsive bg-brand-pms-267/20">
            <p className="text-responsive-base">
              📲 This content only shows on tablets (768px - 1023px)
            </p>
          </div>
        )}
        
        {isDesktop && (
          <div className="card-responsive bg-brand-pms-354/20">
            <p className="text-responsive-base">
              💻 This content only shows on desktops (≥ 1024px)
            </p>
          </div>
        )}
      </section>

      {/* Responsive Grid Example */}
      <section className="mb-8">
        <h2 className="text-responsive-xl text-brand-reflex-blue mb-4">
          Responsive Grid Layout
        </h2>
        <div className="grid-responsive md:grid-responsive-2 lg:grid-responsive-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="card-responsive bg-brand-pms-285/20">
              <h3 className="text-responsive-lg text-brand-reflex-blue mb-2">
                Card {num}
              </h3>
              <p className="text-responsive-sm text-brand-reflex-blue/70">
                1 column on mobile, 2 on tablet, 3 on desktop
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive Buttons Example */}
      <section className="mb-8">
        <h2 className="text-responsive-xl text-brand-reflex-blue mb-4">
          Touch-Friendly Buttons
        </h2>
        <div className="stack-mobile md:unstack-tablet gap-4">
          <button className="touch-target btn-responsive bg-brand-reflex-blue text-white rounded-lg hover:bg-brand-pms-285 transition-colors">
            Standard Touch Target (44px)
          </button>
          <button className="touch-target-large btn-responsive bg-brand-pms-267 text-white rounded-lg hover:bg-brand-pms-265 transition-colors">
            Large Touch Target (48px)
          </button>
        </div>
      </section>

      {/* CSS Visibility Utilities Example */}
      <section className="mb-8">
        <h2 className="text-responsive-xl text-brand-reflex-blue mb-4">
          CSS Visibility Controls
        </h2>
        <div className="space-y-4">
          <div className="show-mobile-only card-responsive bg-brand-pms-129/20">
            <p className="text-responsive-base">
              📱 CSS: Visible only on mobile (using .show-mobile-only)
            </p>
          </div>
          <div className="show-tablet-only card-responsive bg-brand-pms-267/20">
            <p className="text-responsive-base">
              📲 CSS: Visible only on tablet (using .show-tablet-only)
            </p>
          </div>
          <div className="show-desktop-only card-responsive bg-brand-pms-354/20">
            <p className="text-responsive-base">
              💻 CSS: Visible only on desktop (using .show-desktop-only)
            </p>
          </div>
        </div>
      </section>

      {/* Responsive Image Example */}
      <section className="mb-8">
        <h2 className="text-responsive-xl text-brand-reflex-blue mb-4">
          Responsive Images
        </h2>
        <div className="grid-responsive md:grid-responsive-2 lg:grid-responsive-3 gap-4">
          <div>
            <div className="aspect-responsive-square bg-brand-pms-290 rounded-lg mb-2" />
            <p className="text-responsive-sm text-center">Square Aspect (1:1)</p>
          </div>
          <div>
            <div className="aspect-responsive-video bg-brand-pms-290 rounded-lg mb-2" />
            <p className="text-responsive-sm text-center">Video Aspect (16:9)</p>
          </div>
          <div>
            <div className="aspect-responsive-portrait bg-brand-pms-290 rounded-lg mb-2" />
            <p className="text-responsive-sm text-center">Portrait Aspect (3:4)</p>
          </div>
        </div>
      </section>

      {/* Responsive Typography Scale */}
      <section className="mb-8">
        <h2 className="text-responsive-xl text-brand-reflex-blue mb-4">
          Responsive Typography Scale
        </h2>
        <div className="space-y-2">
          <p className="text-responsive-3xl">3XL - Largest Heading</p>
          <p className="text-responsive-2xl">2XL - Large Heading</p>
          <p className="text-responsive-xl">XL - Medium Heading</p>
          <p className="text-responsive-lg">LG - Small Heading</p>
          <p className="text-responsive-base">Base - Body Text</p>
          <p className="text-responsive-sm">SM - Small Text</p>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-responsive-xl text-brand-reflex-blue mb-4">
          Usage Examples
        </h2>
        
        <div className="space-y-6">
          {/* Hook Example */}
          <div className="card-responsive bg-brand-pms-290/20">
            <h3 className="text-responsive-lg text-brand-reflex-blue mb-2">
              Using Breakpoint Hooks
            </h3>
            <pre className="text-xs bg-white p-4 rounded overflow-x-auto">
{`import { useBreakpoint, useIsMobile } from '@/hooks/use-breakpoint'

function MyComponent() {
  const { breakpoint, deviceType } = useBreakpoint()
  const isMobile = useIsMobile()
  
  return (
    <div>
      {isMobile && <MobileLayout />}
      {deviceType === 'tablet' && <TabletLayout />}
    </div>
  )
}`}
            </pre>
          </div>

          {/* CSS Utilities Example */}
          <div className="card-responsive bg-brand-pms-290/20">
            <h3 className="text-responsive-lg text-brand-reflex-blue mb-2">
              Using CSS Utilities
            </h3>
            <pre className="text-xs bg-white p-4 rounded overflow-x-auto">
{`<div className="grid-responsive md:grid-responsive-2 lg:grid-responsive-3 gap-4">
  {items.map(item => (
    <div className="card-responsive">
      <h3 className="text-responsive-lg">{item.title}</h3>
      <button className="touch-target btn-responsive">
        Click Me
      </button>
    </div>
  ))}
</div>`}
            </pre>
          </div>

          {/* Responsive Spacing Example */}
          <div className="card-responsive bg-brand-pms-290/20">
            <h3 className="text-responsive-lg text-brand-reflex-blue mb-2">
              Responsive Spacing
            </h3>
            <pre className="text-xs bg-white p-4 rounded overflow-x-auto">
{`<section className="spacing-mobile md:spacing-tablet lg:spacing-desktop">
  {/* Padding and gaps adapt automatically:
      Mobile: 16px (p-4, gap-4)
      Tablet: 24px (p-6, gap-6)
      Desktop: 32px (p-8, gap-8) */}
</section>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="mt-12 pt-8 border-t-2 border-brand-pms-285">
        <p className="text-responsive-sm text-brand-reflex-blue/70 text-center">
          This example component demonstrates Phase 1 responsive utilities. 
          For more information, see RESPONSIVE_PHASE1_SUMMARY.md
        </p>
      </footer>
    </div>
  )
}

