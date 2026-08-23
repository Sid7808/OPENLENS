import Mark from "../../assets/brand/openlens-mark.svg";

export default function LoginBrandPanel() {
    return (
        <div className="login-brand-panel">
            <div className="panel-content">
                <div className="panel-header">
                    <img src={Mark} alt="OpenLens Mark" className="panel-mark" />
                </div>
                
                <h2 className="panel-headline">
                    Turn your data into <span className="highlight-text">actionable intelligence</span>.
                </h2>
                
                <p className="panel-subheadline">
                    Connect, analyze, and scale your data workflows with OpenLens's powerful AI-driven analytics platform.
                </p>

                <div className="features-list">
                    <div className="feature-block">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Unify your data</h3>
                            <p>Bring your data sources together in one place.</p>
                        </div>
                    </div>

                    <div className="feature-block">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>AI-powered insights</h3>
                            <p>Discover patterns and trends with intelligent analytics.</p>
                        </div>
                    </div>

                    <div className="feature-block">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Secure & scalable</h3>
                            <p>Built to grow with your data and workflows.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="panel-visual">
                {/* Abstract data visual using CSS grids/shapes */}
                <div className="abstract-chart">
                    <div className="bar" style={{ height: '40%' }}></div>
                    <div className="bar" style={{ height: '70%' }}></div>
                    <div className="bar" style={{ height: '55%' }}></div>
                    <div className="bar highlight-bar" style={{ height: '90%' }}></div>
                    <div className="bar" style={{ height: '60%' }}></div>
                </div>
            </div>
        </div>
    );
}
