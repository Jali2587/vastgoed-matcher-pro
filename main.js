const { useState, useEffect } = React;
        
        // Simple icon components to avoid React errors
        const PlusIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M12 5v14M5 12h14' }));
        
        const UsersIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: '9', cy: '7', r: '4' }), React.createElement('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' }));
        
        const BuildingIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z' }), React.createElement('path', { d: 'M6 12h4h4' }), React.createElement('path', { d: 'M6 20h4h4' }), React.createElement('path', { d: 'M10 4h4' }), React.createElement('path', { d: 'M10 8h4' }));
        
        const StarIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('polygon', { points: '12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26' }));
        
        const FilterIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('polygon', { points: '22,3 2,3 10,12.46 10,19 14,21 14,12.46' }));
        
        const MailIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }), React.createElement('polyline', { points: '22,6 12,13 2,6' }));
        
        const PhoneIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' }));
        
        const MapPinIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }), React.createElement('circle', { cx: '12', cy: '10', r: '3' }));
        
        const EuroIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M18.5 6.5a9 9 0 0 0-9 9v0a9 9 0 0 0 9 9M6 12h9' }));
        
        const TrendingUpIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('polyline', { points: '22,7 13.5,15.5 8.5,10.5 2,17' }), React.createElement('polyline', { points: '16,7 22,7 22,13' }));
        
        const CalendarIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }), React.createElement('line', { x1: '16', y1: '2', x2: '16', y2: '6' }), React.createElement('line', { x1: '8', y1: '2', x2: '8', y2: '6' }), React.createElement('line', { x1: '3', y1: '10', x2: '21', y2: '10' }));
        
        const AlertCircleIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('circle', { cx: '12', cy: '12', r: '10' }), React.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '12' }), React.createElement('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' }));
        
        const LogOutIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }), React.createElement('polyline', { points: '16,17 21,12 16,7' }), React.createElement('line', { x1: '21', y1: '12', x2: '9', y2: '12' }));
        
        const UserIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: '12', cy: '7', r: '4' }));
        
        const BrainIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M12 2a3 3 0 0 0-3 3 3 3 0 0 0-3 3v1a3 3 0 0 0 3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0 3-3V8a3 3 0 0 0-3-3 3 3 0 0 0-3-3z' }));
        
        const SearchIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('circle', { cx: '11', cy: '11', r: '8' }), React.createElement('path', { d: 'M21 21l-4.35-4.35' }));
        
        const FileTextIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), React.createElement('polyline', { points: '14,2 14,8 20,8' }), React.createElement('line', { x1: '16', y1: '13', x2: '8', y2: '13' }), React.createElement('line', { x1: '16', y1: '17', x2: '8', y2: '17' }), React.createElement('polyline', { points: '10,9 9,9 8,9' }));
        
        const TargetIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('circle', { cx: '12', cy: '12', r: '10' }), React.createElement('circle', { cx: '12', cy: '12', r: '6' }), React.createElement('circle', { cx: '12', cy: '12', r: '2' }));
        
        const ZapIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('polygon', { points: '13,2 3,14 12,14 11,22 21,10 12,10' }));
        
        const DollarSignIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('line', { x1: '12', y1: '1', x2: '12', y2: '23' }), React.createElement('path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' }));
        
        const UserCheckIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: '8.5', cy: '7', r: '4' }), React.createElement('polyline', { points: '17,11 19,13 23,9' }));
        
        const AwardIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('circle', { cx: '12', cy: '8', r: '7' }), React.createElement('polyline', { points: '8.21,13.89 7,23 12,20 17,23 15.79,13.88' }));
        
        const SettingsIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('circle', { cx: '12', cy: '12', r: '3' }), React.createElement('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' }));
        
        const EditIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }), React.createElement('path', { d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' }));
        
        const TrashIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('polyline', { points: '3,6 5,6 21,6' }), React.createElement('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' }), React.createElement('line', { x1: '10', y1: '11', x2: '10', y2: '17' }), React.createElement('line', { x1: '14', y1: '11', x2: '14', y2: '17' }));

        const PercentIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('line', { x1: '19', y1: '5', x2: '5', y2: '19' }), React.createElement('circle', { cx: '6.5', cy: '6.5', r: '2.5' }), React.createElement('circle', { cx: '17.5', cy: '17.5', r: '2.5' }));

        const ExternalLinkIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }), React.createElement('polyline', { points: '15,3 21,3 21,9' }), React.createElement('line', { x1: '10', y1: '14', x2: '21', y2: '3' }));

        const UploadIcon = ({ size = 20, className = '' }) => React.createElement('svg', { 
          width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', className 
        }, React.createElement('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), React.createElement('polyline', { points: '14,2 14,8 20,8' }), React.createElement('line', { x1: '12', y1: '18', x2: '12', y2: '12' }), React.createElement('polyline', { points: '9,15 12,12 15,15' }));

        const VastgoedInvesteerderMatcher = () => {
          const [user, setUser] = useState(null);
          const [activeTab, setActiveTab] = useState('dashboard');
          const [investors, setInvestors] = useState([]);
          const [deals, setDeals] = useState([]);
          const [transactions, setTransactions] = useState([]);
          const [users, setUsers] = useState([]);
          const [matches, setMatches] = useState([]);
          const [showAddInvestor, setShowAddInvestor] = useState(false);
          const [showAddDeal, setShowAddDeal] = useState(false);
          const [showAuth, setShowAuth] = useState(true);
          const [aiInsights, setAiInsights] = useState({});
          const [isLoadingAI, setIsLoadingAI] = useState(false);
          
          const [showCommissionEditor, setShowCommissionEditor] = useState(false);
          const [editingDealCommission, setEditingDealCommission] = useState(null);
          const [currentTransaction, setCurrentTransaction] = useState(null);

          const [editingInvestor, setEditingInvestor] = useState(null);
          const [editingDeal, setEditingDeal] = useState(null);
          const [showEditInvestor, setShowEditInvestor] = useState(false);
          const [showEditDeal, setShowEditDeal] = useState(false);

          // 🔥 NEW: Broker Management State
          const [brokers, setBrokers] = useState([]);
          const [showAddBroker, setShowAddBroker] = useState(false);
          const [editingBroker, setEditingBroker] = useState(null);
          const [showEditBroker, setShowEditBroker] = useState(false);
          const [contactFilter, setContactFilter] = useState('all'); // all, investors, brokers

          // 🔥 NEW: CSV Upload State
          const [showCSVUpload, setShowCSVUpload] = useState(false);
          const [csvData, setCSVData] = useState([]);
          const [csvPreview, setCSVPreview] = useState([]);
          const [csvUploadStatus, setCSVUploadStatus] = useState('');
          const [isUploading, setIsUploading] = useState(false);

          // 🔥 ENHANCED AI MATCHING WITH SEMANTIC ANALYSIS
          const callOpenAI = async (prompt, type = 'analysis', data = null) => {
            setIsLoadingAI(true);
            
            try {
              const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, type, data })
              });
              
              if (response.ok) {
                const result = await response.json();
                setIsLoadingAI(false);
                return result.data;
              }
            } catch (error) {
              console.log('OpenAI API niet beschikbaar, gebruik demo data:', error);
            }
            
            // Enhanced fallback with semantic matching simulation
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const mockResponses = {
              enhanced_matching: {
                semanticScore: 85,
                semanticReasons: [
                  'Sterke match: "stabiele huurinkomsten" ↔ "gegarandeerde huurder 5 jaar"',
                  'Perfecte match: "geen renovatie" ↔ "turn-key appartement"', 
                  'Goede match: "duurzaamheid belangrijk" ↔ "energielabel A"',
                  'Match: "ervaring met appartementen" ↔ "luxe appartement complex"'
                ],
                conflictAnalysis: [],
                overallCompatibility: 92,
                pitchRecommendations: [
                  'Benadruk de gegarandeerde huurinkomsten van 5 jaar',
                  'Vermeld turn-key voordeel: direct rendement zonder werk',
                  'Highlight duurzaamheid: energielabel A en lage kosten',
                  'Toon vergelijkbare succesvolle projecten in portfolio'
                ]
              },
              investor_analysis: {
                financialStrength: 'Hoog - Stabiele inkomstenbron via vastgoedbeleggingen',
                riskAppetite: 'Gemiddeld tot hoog - Ervaren investeerder met diversified portfolio',
                marketKnowledge: 'Goed - Actief in Nederlandse vastgoedmarkt sinds 2015',
                preferredSectors: ['Residentieel', 'Commercieel retail'],
                projectTypePreference: ['Turn-key', 'Renovatie'],
                investmentStrategy: 'Buy-and-hold met focus op cashflow generatie',
                recommendations: 'Geschikt voor deals met stabiele huurinkomsten en potentieel voor waardestijging',
                behaviorProfile: 'Voorzichtige beslisser, graag veel informatie vooraf',
                investmentTimeline: 'Zoekt deals voor Q2-Q3 2024',
                marketSentiment: 'Positief over vastgoedmarkt, maar voorzichtig met nieuwe projecten'
              },
              deal_analysis: {
                marketPosition: 'Aantrekkelijk - Locatie in groeiende wijk met goede bereikbaarheid',
                projectTypeAnalysis: 'Turn-key voordeel: Direct rendement, lagere ontwikkelingsrisico\'s',
                competitiveAnalysis: 'Vergelijkbare panden in de buurt hebben 5-7% rendement',
                riskFactors: [
                  'Mogelijke leegstand bij huurwisseling', 
                  'Onderhoudskosten oudere panden',
                  'Marktvolatiliteit in de regio'
                ],
                opportunities: [
                  'Huurverhoging mogelijk door renovatie', 
                  'Waardestijging door buurtverbetering',
                  'Turn-key voordeel: Direct rendement, lagere ontwikkelingsrisico\'s',
                  'Renovatie kansen: Waardecreatie door modernisering',
                  'Transformatie potentieel: Functiewijziging verhoogt marktwaarde'
                ],
                priceAnalysis: 'Marktconform geprijsd, kleine onderhandelingsruimte',
                recommendation: 'Aanbevolen voor conservatieve tot gemiddelde risico investeerders',
                marketTrends: 'Prijzen in dit gebied stijgen 3-5% per jaar',
                demographicAnalysis: 'Populair bij young professionals en small families',
                futureOutlook: 'Positieve ontwikkeling verwacht door infrastructuurprojecten'
              }
            };

          const DealForm = ({ onSubmit, onCancel, editData = null }) => {
            const [formData, setFormData] = useState(editData || {
              titel: '',
              locatie: '',
              type: '',
              projectType: '',
              prijs: '',
              verwachtRendement: '',
              risico: 'Gemiddeld',
              beschrijving: '',
              bijzonderheden: '', // 🔥 NEW: For semantic matching
              oppervlakte: '',
              bouwjaar: '',
              huurpotentie: '',
              status: 'Beschikbaar',
              bedrijfFonds: '',
              contactpersoon: '',
              telefoon: '',
              email: ''
            });

            const handleSubmit = (e) => {
              e.preventDefault();
              onSubmit(formData);
            };

            return (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[95vh] flex flex-col">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        {editData ? '✏️ Deal Bewerken' : '➕ Nieuwe Deal Toevoegen'}
                      </h3>
                      <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                    <p className="text-sm text-purple-600 mt-2">
                      🔥 Enhanced: Uitgebreide beschrijvingen voor AI semantic matching
                    </p>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    <form onSubmit={handleSubmit} id="deal-form">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-1">Titel *</label>
                          <input
                            type="text"
                            value={formData.titel}
                            onChange={(e) => setFormData({...formData, titel: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Bedrijf/Fonds</label>
                          <input
                            type="text"
                            value={formData.bedrijfFonds}
                            onChange={(e) => setFormData({...formData, bedrijfFonds: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Naam van bedrijf of fonds"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Contactpersoon</label>
                          <input
                            type="text"
                            value={formData.contactpersoon}
                            onChange={(e) => setFormData({...formData, contactpersoon: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Naam contactpersoon"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Telefoon</label>
                          <input
                            type="tel"
                            value={formData.telefoon}
                            onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Telefoonnummer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email adres"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Locatie *</label>
                          <input
                            type="text"
                            value={formData.locatie}
                            onChange={(e) => setFormData({...formData, locatie: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Bijvoorbeeld: Amsterdam, Berlijn, etc."
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Type *</label>
                          <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Selecteer type</option>
                            <option value="Appartement">Appartement</option>
                            <option value="Kantoor">Kantoor</option>
                            <option value="Retail">Retail</option>
                            <option value="Industrie">Industrie</option>
                            <option value="Woning">Woning</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Studenten">Studenten</option>
                            <option value="Zorgvastgoed">Zorgvastgoed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Project Type *</label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Selecteer project type</option>
                            <option value="Turn-key">Turn-key - Kant-en-klaar</option>
                            <option value="Renovatie">Renovatie - Opknappen</option>
                            <option value="Transformatie">Transformatie - Functiewijziging</option>
                            <option value="Ontwikkeling">Ontwikkeling - Nieuwbouw</option>
                            <option value="Gemengd">Gemengd - Combinatie</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Prijs (€) *</label>
                          <input
                            type="number"
                            value={formData.prijs}
                            onChange={(e) => setFormData({...formData, prijs: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Verwacht Rendement (%) *</label>
                          <input
                            type="number"
                            step="0.1"
                            value={formData.verwachtRendement}
                            onChange={(e) => setFormData({...formData, verwachtRendement: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Risico Level</label>
                          <select
                            value={formData.risico}
                            onChange={(e) => setFormData({...formData, risico: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Laag">Laag</option>
                            <option value="Gemiddeld">Gemiddeld</option>
                            <option value="Hoog">Hoog</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Oppervlakte (m²)</label>
                          <input
                            type="number"
                            value={formData.oppervlakte}
                            onChange={(e) => setFormData({...formData, oppervlakte: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Bouwjaar</label>
                          <input
                            type="number"
                            value={formData.bouwjaar}
                            onChange={(e) => setFormData({...formData, bouwjaar: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Huurpotentie (€/maand)</label>
                          <input
                            type="number"
                            value={formData.huurpotentie}
                            onChange={(e) => setFormData({...formData, huurpotentie: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      {/* 🔥 ENHANCED DESCRIPTIONS FOR SEMANTIC MATCHING */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-4 text-gray-800">🤖 Deal Beschrijving (Voor AI Matching)</h4>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Hoofdbeschrijving</label>
                          <textarea
                            value={formData.beschrijving}
                            onChange={(e) => setFormData({...formData, beschrijving: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            placeholder="Bijvoorbeeld: Kant-en-klaar nieuwbouw appartement in opkomende wijk. Energielabel A, zonnepanelen. Gegarandeerde huurder voor 5 jaar via corporatie. Nabij metro, 15 min naar centrum..."
                          />
                          <p className="text-xs text-purple-600 mt-1">
                            💡 AI matcht deze tekst met investeerder motivaties
                          </p>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">
                            🔥 Bijzonderheden & USP's
                          </label>
                          <textarea
                            value={formData.bijzonderheden}
                            onChange={(e) => setFormData({...formData, bijzonderheden: e.target.value})}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            placeholder="Bijvoorbeeld: Duurzaam gebouwd, lage servicekosten. Professioneel beheer beschikbaar. Uitstekende buurt met goede voorzieningen. Turn-key: direct rendement, geen werk aan..."
                          />
                          <p className="text-xs text-purple-600 mt-1">
                            💡 Extra details die AI gebruikt voor slimme matching
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div className="p-6 border-t bg-gray-50">
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
                      >
                        Annuleren
                      </button>
                      <button
                        type="submit"
                        form="deal-form"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        {editData ? '💾 Opslaan' : '➕ Toevoegen'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          };

          // Auth Form (unchanged)
          const AuthForm = () => {
            const [formData, setFormData] = useState({
              email: '',
              password: '',
              name: '',
              company: ''
            });
            const [showRegister, setShowRegister] = useState(false);
            const [isLoading, setIsLoading] = useState(false);

            const handleSubmit = async (e) => {
              e.preventDefault();
              setIsLoading(true);
              
              try {
                if (showRegister) {
                  await handleRegister(formData);
                } else {
                  await handleLogin(formData);
                }
              } finally {
                setIsLoading(false);
              }
            };

            return (
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">🏠 Vastgoed Matcher Pro</h1>
                    <p className="text-gray-600">
                      {showRegister ? 'Nieuw account aanmaken' : 'Inloggen op je account'}
                    </p>
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">🤖 AI-Enhanced</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">🌍 Simplified</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">💰 Flex Commission</span>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">🔥 Semantic</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">📤 CSV Upload</span>
                    </div>
                  </div>

                  {!showRegister && (
                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">🔥 Enhanced Matching Features</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-white p-3 rounded border border-purple-200">
                          <p className="font-medium text-purple-900">🗺️ Vereenvoudigde Locatie Invoer</p>
                          <p className="text-purple-700">Minder dropdowns, meer vrije tekst input</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-purple-200">
                          <p className="font-medium text-purple-900">🤖 AI Semantic Matching</p>
                          <p className="text-purple-700">AI matcht opmerkingen en beschrijvingen intelligent</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded border border-green-200">
                          <p className="font-medium text-green-900">🎯 Betere Match Kwaliteit</p>
                          <p className="text-green-700">• Vrije tekst matching • Conflict detectie • Genuanceerde voorkeuren</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                          <p className="font-medium text-blue-900">📤 CSV Upload Functionaliteit</p>
                          <p className="text-blue-700">• LinkedIn CSV import • Auto-classificatie • Bulk upload contacten</p>
                        </div>
                      </div>
                    </div>
                  )}

              {activeTab === 'deals' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-2xl font-bold">Deals</h2>
                    <button
                      onClick={() => setShowAddDeal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                      <PlusIcon size={20} />
                      <span>Nieuwe Deal</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {deals.map(deal => (
                      <div key={deal.id} className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">{deal.titel}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            deal.risico === 'Laag' ? 'bg-green-100 text-green-800' :
                            deal.risico === 'Gemiddeld' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {deal.risico} risico
                          </span>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center space-x-2">
                            <UserCheckIcon size={16} className="text-gray-500" />
                            <span>Eigenaar: {getUserById(deal.owner_id).name}</span>
                          </div>
                          {deal.bedrijfFonds && (
                            <div className="flex items-center space-x-2">
                              <BuildingIcon size={16} className="text-gray-500" />
                              <span className="font-medium">{deal.bedrijfFonds}</span>
                            </div>
                          )}
                          {deal.contactpersoon && (
                            <div className="flex items-center space-x-2">
                              <UserIcon size={16} className="text-gray-500" />
                              <span>{deal.contactpersoon}</span>
                            </div>
                          )}
                          {deal.telefoon && (
                            <div className="flex items-center space-x-2">
                              <PhoneIcon size={16} className="text-gray-500" />
                              <span>{deal.telefoon}</span>
                            </div>
                          )}
                          {deal.email && (
                            <div className="flex items-center space-x-2">
                              <MailIcon size={16} className="text-gray-500" />
                              <span>{deal.email}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <MapPinIcon size={16} className="text-gray-500" />
                            <span>{deal.locatie}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BuildingIcon size={16} className="text-gray-500" />
                            <span>{deal.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TargetIcon size={16} className="text-gray-500" />
                            <span>{deal.projectType}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <EuroIcon size={16} className="text-gray-500" />
                            <span className="font-semibold">€{deal.prijs.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUpIcon size={16} className="text-gray-500" />
                            <span className="font-semibold text-green-600">{deal.verwachtRendement}% rendement</span>
                          </div>
                        </div>

                        {deal.commissionStructure && (
                          <div className="mb-4 p-3 bg-gray-50 rounded border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Commissie Structuur</span>
                              <span className="text-sm text-gray-600">
                                {(deal.commissionStructure.total_rate * 100).toFixed(2)}%
                              </span>
                            </div>
                            <div className="text-xs text-gray-600">
                              {deal.commissionStructure.participants?.length || 0} deelnemers geconfigureerd
                            </div>
                          </div>
                        )}

                        <p className="text-sm text-gray-600 mb-4">{deal.beschrijving}</p>

                        {/* 🔥 ENHANCED: Show semantic fields */}
                        {deal.bijzonderheden && (
                          <div className="mb-4 p-3 bg-purple-50 rounded border border-purple-200">
                            <p className="text-sm text-purple-800 font-medium mb-1">🔥 Bijzonderheden:</p>
                            <p className="text-xs text-purple-700">{deal.bijzonderheden}</p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setMatches(findMatches(deal.id));
                              setActiveTab('matching');
                            }}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                          >
                            <StarIcon size={16} />
                            <span>🔥 Enhanced Matches</span>
                          </button>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => getDealInsights(deal.id)}
                              disabled={isLoadingAI}
                              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                            >
                              <BrainIcon size={16} />
                              <span>{isLoadingAI ? 'AI...' : 'AI Analyse'}</span>
                            </button>
                            
                            <button
                              onClick={() => openCommissionEditor(deal)}
                              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                            >
                              <PercentIcon size={16} />
                              <span>Commissie</span>
                            </button>
                          </div>

                          {(user.role === 'beheerder' || deal.owner_id === user.id) && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditDeal(deal)}
                                className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                              >
                                <EditIcon size={16} />
                                <span>Bewerken</span>
                              </button>
                              <button
                                onClick={() => handleDeleteDeal(deal.id)}
                                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                              >
                                <TrashIcon size={16} />
                                <span>Verwijderen</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {deals.length === 0 && (
                    <div className="text-center py-12">
                      <BuildingIcon size={48} className="text-gray-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-gray-600 text-lg">Nog geen deals toegevoegd</p>
                        <p className="text-sm text-gray-500">
                          Voeg je eerste deal toe om te beginnen met matchen
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'matching' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">🔥 Enhanced AI-Powered Matching</h2>
                    
                    {matches.length === 0 ? (
                      <div className="text-center py-12">
                        <AlertCircleIcon size={48} className="text-gray-400 mx-auto mb-4" />
                        <div className="space-y-2">
                          <p className="text-gray-600 text-lg">Selecteer een deal om enhanced AI-powered matches te vinden</p>
                          <p className="text-sm text-gray-500">
                            🔥 Enhanced Features: Semantic matching van beschrijvingen, vrije tekst analyse, conflict detectie
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
                          <h4 className="font-semibold text-purple-800 mb-3">🔥 Enhanced AI Matching Features:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
                            <div className="space-y-2">
                              <p>• 🗺️ Vereenvoudigde locatie matching</p>
                              <p>• 🤖 Semantic text analyse van beschrijvingen</p>
                              <p>• 💬 Vrije tekst input matching</p>
                              <p>• ⚠️ Conflict detectie tussen wensen en aanbod</p>
                            </div>
                            <div className="space-y-2">
                              <p>• 🎯 Intelligente keyword matching</p>
                              <p>• 📝 Investment motivatie vs deal beschrijving</p>
                              <p>• 🚀 Enhanced compatibility scoring</p>
                              <p>• 💰 Flexibele commissie structuren</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                            <div className="mb-4 lg:mb-0">
                              <h3 className="font-semibold text-lg mb-2">🎯 Deal: {matches[0].deal.titel}</h3>
                              <p className="text-sm text-gray-600 mb-2">{matches[0].deal.beschrijving}</p>
                              {matches[0].deal.bijzonderheden && (
                                <p className="text-sm text-purple-600 mb-2">🔥 {matches[0].deal.bijzonderheden}</p>
                              )}
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className="text-blue-600 font-medium">Deal eigenaar: {getUserById(matches[0].deal.owner_id).name}</span>
                                {matches[0].deal.bedrijfFonds && (
                                  <span className="text-gray-600">Bedrijf/Fonds: {matches[0].deal.bedrijfFonds}</span>
                                )}
                                <span className="text-gray-600">Type: {matches[0].deal.type}</span>
                                <span className="text-gray-600">Project: {matches[0].deal.projectType}</span>
                              </div>
                            </div>
                            <div className="text-center lg:text-right">
                              <div className="text-3xl font-bold text-blue-600">{matches.length}</div>
                              <div className="text-sm text-gray-600">Enhanced Matches</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {matches.map((match, index) => (
                            <div key={match.investor.id} className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow">
                              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4">
                                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                                  <div className="flex items-center space-x-2">
                                    <span className={`text-2xl font-bold ${
                                      index === 0 ? 'text-yellow-500' : 
                                      index === 1 ? 'text-gray-400' : 
                                      index === 2 ? 'text-orange-400' : 'text-gray-600'
                                    }`}>
                                      #{index + 1}
                                    </span>
                                    <div>
                                      <h3 className="text-xl font-semibold">{match.investor.naam}</h3>
                                      <p className="text-sm text-gray-600">{match.investor.bedrijf}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span className={`px-4 py-2 rounded-full text-lg font-bold ${getMatchColor(match.matchScore)}`}>
                                    {match.matchScore}% match
                                  </span>
                                  {match.semanticScore > 0 && (
                                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                      🔥 +{match.semanticScore} semantic
                                    </span>
                                  )}
                                  <button
                                    onClick={() => createTransaction(match.deal.id, match.investor.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                  >
                                    <DollarSignIcon size={16} />
                                    <span>Start Deal</span>
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">🔥 Enhanced Match Analyse:</h4>
                                  <div className="space-y-2">
                                    {match.reasoning.map((reason, idx) => (
                                      <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                                        {reason}
                                      </div>
                                    ))}
                                    {match.semanticReasons && match.semanticReasons.length > 0 && (
                                      <div className="mt-3">
                                        <p className="text-sm font-medium text-purple-700 mb-2">🤖 Semantic Matches:</p>
                                        {match.semanticReasons.map((reason, idx) => (
                                          <div key={idx} className="text-sm p-2 bg-purple-50 rounded border border-purple-200">
                                            {reason}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">Investeerder Details:</h4>
                                  <div className="space-y-2 text-sm">
                                    {match.investor.bedrijf && <p>Bedrijf: {match.investor.bedrijf}</p>}
                                    <p>Budget: €{match.investor.minBudget.toLocaleString()} - €{match.investor.maxBudget.toLocaleString()}</p>
                                    <p>Gewenst rendement: {match.investor.gewenstRendement}%</p>
                                    <p>Risicoprofiel: {match.investor.risicoprofiel}</p>
                                    <p>Ervaring: {match.investor.ervaringLevel}</p>
                                    <p>Beschikbaarheid: {match.investor.beschikbaarheid}</p>
                                    {match.investor.locatieDetails && (
                                      <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                                        <p className="font-medium text-blue-800">Locatie Details:</p>
                                        <p className="text-blue-700">{match.investor.locatieDetails}</p>
                                      </div>
                                    )}
                                    {match.investor.investmentMotivatie && (
                                      <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                                        <p className="font-medium text-green-800">Investment Motivatie:</p>
                                        <p className="text-green-700">{match.investor.investmentMotivatie}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 flex flex-wrap gap-2">
                                <button
                                  onClick={() => getSmartMatchingInsights(match.deal.id, match.investor.id)}
                                  disabled={isLoadingAI}
                                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                                >
                                  <BrainIcon size={16} />
                                  <span>{isLoadingAI ? 'AI Analyseert...' : '🔥 Enhanced AI Analyse'}</span>
                                </button>
                                <button
                                  onClick={() => alert(`Contacteer ${match.investor.naam} via ${match.investor.communicatieVoorkeur.toLowerCase()}: ${match.investor.email}`)}
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                >
                                  <MailIcon size={16} />
                                  <span>Contact</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'transactions' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Transacties & Commissies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg shadow border">
                        <h3 className="font-semibold text-gray-700">Totale Commissie</h3>
                        <p className="text-2xl font-bold text-green-600">
                          €{calculateCommissionSummary().totalCommission.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow border">
                        <h3 className="font-semibold text-gray-700">Afgeronde Deals</h3>
                        <p className="text-2xl font-bold text-blue-600">
                          {calculateCommissionSummary().completedTransactions}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow border">
                        <h3 className="font-semibold text-gray-700">Pending Deals</h3>
                        <p className="text-2xl font-bold text-yellow-600">
                          {calculateCommissionSummary().pendingTransactions}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {transactions.map(transaction => {
                      const deal = deals.find(d => d.id === transaction.deal_id);
                      const investor = investors.find(i => i.id === transaction.investor_id);
                      
                      let participantCommissions = [];
                      try {
                        participantCommissions = transaction.participant_commissions ? 
                          JSON.parse(transaction.participant_commissions) : [];
                      } catch (e) {
                        console.error('Error parsing participant commissions:', e);
                      }

                      return (
                        <div key={transaction.id} className="bg-white rounded-lg shadow-md p-6 border">
                          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">
                                {deal?.titel || 'Onbekende Deal'}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <span>Investeerder: {investor?.naam || 'Onbekend'}</span>
                                <span>Waarde: €{transaction.transaction_amount.toLocaleString()}</span>
                                <span>Commissie: €{transaction.total_commission.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="mt-4 lg:mt-0">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {transaction.status === 'completed' ? 'Afgerond' : 'Pending'}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Deal Details:</h4>
                              <div className="space-y-2 text-sm">
                                {deal?.bedrijfFonds && <p>Bedrijf/Fonds: {deal.bedrijfFonds}</p>}
                                <p>Locatie: {deal?.locatie || 'Onbekend'}</p>
                                <p>Type: {deal?.type || 'Onbekend'}</p>
                                <p>Project: {deal?.projectType || 'Onbekend'}</p>
                                <p>Verwacht rendement: {deal?.verwachtRendement || 0}%</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Commissie Verdeling:</h4>
                              <div className="space-y-2">
                                {participantCommissions.map((participant, index) => {
                                  const userName = participant.is_external 
                                    ? participant.name 
                                    : getUserById(participant.user_id).name;
                                  
                                  return (
                                    <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                                      <span className="flex items-center space-x-2">
                                        <span>{userName} ({participant.role})</span>
                                        {participant.is_external && (
                                          <span className="px-1 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                                            Extern
                                          </span>
                                        )}
                                      </span>
                                      <span className="font-semibold">
                                        €{participant.commission_amount.toLocaleString()}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              {participantCommissions.some(p => p.is_external) && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                                  <h5 className="font-medium text-green-800 mb-2">Externe Partners:</h5>
                                  <div className="space-y-2 text-sm">
                                    {participantCommissions
                                      .filter(p => p.is_external)
                                      .map((participant, index) => (
                                        <div key={index} className="flex flex-col space-y-1">
                                          <span className="font-medium">{participant.name}</span>
                                          {participant.email && (
                                            <span className="text-gray-600">📧 {participant.email}</span>
                                          )}
                                          {participant.company && (
                                            <span className="text-gray-600">🏢 {participant.company}</span>
                                          )}
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {transactions.length === 0 && (
                      <div className="text-center py-12">
                        <DollarSignIcon size={48} className="text-gray-400 mx-auto mb-4" />
                        <div className="space-y-2">
                          <p className="text-gray-600 text-lg">Nog geen transacties</p>
                          <p className="text-sm text-gray-500">
                            Start deals via de matching tab om transacties te genereren
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {Object.keys(aiInsights).length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                      <h4 className="text-xl font-bold flex items-center space-x-2">
                        <BrainIcon size={20} />
                        <span>🔥 Enhanced AI Analyse</span>
                      </h4>
                      <button
                        onClick={() => setAiInsights({})}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-6">
                      {Object.entries(aiInsights).slice(-1).map(([key, insight]) => (
                        <div key={key} className="space-y-6">
                          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                            <h3 className="font-bold text-lg mb-2 text-purple-900">
                              {key.includes('enhanced_match') ? '🔥 Enhanced Smart Match Analyse' :
                              key.includes('investor') ? '👤 Investeerder Analyse' :
                              key.includes('deal') ? '🏢 Deal Analyse' :
                              '📊 Markt Inzichten'}
                            </h3>
                            <p className="text-sm text-purple-700">
                              Gegenereerd op {new Date().toLocaleString('nl-NL')} | Enhanced met semantic analysis
                            </p>
                          </div>
                          
                          {typeof insight === 'object' && insight.semanticScore !== undefined ? (
                            <div className="space-y-4">
                              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h4 className="font-semibold text-purple-800 mb-3">🔥 Enhanced Semantic Analysis:</h4>
                                {insight.semanticReasons && insight.semanticReasons.map((reason, idx) => (
                                  <div key={idx} className="bg-white p-3 rounded border border-purple-200 mb-2">
                                    <p className="text-purple-700">{reason}</p>
                                  </div>
                                ))}
                                <div className="mt-3 p-3 bg-white rounded border border-purple-300">
                                  <p className="font-medium text-purple-900">
                                    Semantic Score: <span className="text-2xl">{insight.semanticScore || 0}</span> punten
                                  </p>
                                  <p className="text-purple-700 text-sm">
                                    Based on AI analysis of investment motivatie vs deal beschrijving
                                  </p>
                                </div>
                              </div>
                              
                              {insight.pitchRecommendations && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                  <h4 className="font-semibold text-green-800 mb-3">💡 Pitch Aanbevelingen:</h4>
                                  <ul className="space-y-2">
                                    {insight.pitchRecommendations.map((rec, idx) => (
                                      <li key={idx} className="flex items-start space-x-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span className="text-green-700">{rec}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {insight.overallCompatibility && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                  <h4 className="font-semibold text-blue-800 mb-3">📈 Overall Compatibility:</h4>
                                  <div className="flex items-center space-x-4">
                                    <div className="text-3xl font-bold text-blue-600">
                                      {insight.overallCompatibility}%
                                    </div>
                                    <div className="flex-1">
                                      <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                          style={{ width: `${insight.overallCompatibility}%` }}
                                        ></div>
                                      </div>
                                      <p className="text-blue-700 text-sm mt-1">
                                        Enhanced score including semantic matching
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : typeof insight === 'object' && insight.fullAnalysis ? (
                            <div className="space-y-4">
                              <div className="bg-white border rounded-lg p-4">
                                <h4 className="font-semibold text-gray-800 mb-3">🤖 AI Analyse:</h4>
                                <div className="prose prose-sm max-w-none">
                                  {insight.fullAnalysis.split('\n').map((line, idx) => (
                                    <p key={idx} className="mb-2 text-gray-700 leading-relaxed">
                                      {line}
                                    </p>
                                  ))}
                                </div>
                              </div>
                              
                              {insight.aiRecommendations && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                  <h4 className="font-semibold text-green-800 mb-3">💡 Aanbevelingen:</h4>
                                  <ul className="space-y-2">
                                    {insight.aiRecommendations.map((rec, idx) => (
                                      <li key={idx} className="flex items-start space-x-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span className="text-green-700">{rec}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="bg-gray-50 border rounded-lg p-4">
                              <p className="text-gray-700">
                                {typeof insight === 'string' ? insight : JSON.stringify(insight, null, 2)}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        🔥 Enhanced: Analyse includes semantic matching van teksten en beschrijvingen
                      </div>
                      <button
                        onClick={() => setAiInsights({})}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Sluiten
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showAddInvestor && (
                <InvestorForm
                  onSubmit={handleAddInvestor}
                  onCancel={() => setShowAddInvestor(false)}
                />
              )}

              {showEditInvestor && editingInvestor && (
                <InvestorForm
                  editData={editingInvestor}
                  onSubmit={handleUpdateInvestor}
                  onCancel={() => {
                    setShowEditInvestor(false);
                    setEditingInvestor(null);
                  }}
                />
              )}

              {showAddDeal && (
                <DealForm
                  onSubmit={handleAddDeal}
                  onCancel={() => setShowAddDeal(false)}
                />
              )}

              {showEditDeal && editingDeal && (
                <DealForm
                  editData={editingDeal}
                  onSubmit={handleUpdateDeal}
                  onCancel={() => {
                    setShowEditDeal(false);
                    setEditingDeal(null);
                  }}
                />
              )}

              {showAddBroker && (
                <BrokerForm
                  onSubmit={handleAddBroker}
                  onCancel={() => setShowAddBroker(false)}
                />
              )}

              {showEditBroker && editingBroker && (
                <BrokerForm
                  editData={editingBroker}
                  onSubmit={handleUpdateBroker}
                  onCancel={() => {
                    setShowEditBroker(false);
                    setEditingBroker(null);
                  }}
                />
              )}

              <CommissionEditor />
              <CSVUploadModal />
            </div>
          );
        };

        // Initialize the app
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(VastgoedInvesteerderMatcher));

        console.log('🚀 Vastgoed Matcher Pro AI - Enhanced met CSV Upload geladen!');
        console.log('🔥 Firebase Authentication & Database geïntegreerd');
        console.log('🔥 NIEUWE ENHANCED FEATURES:');
        console.log('   • 📤 CSV UPLOAD FUNCTIONALITEIT:');
        console.log('     - LinkedIn CSV import via Papa Parse');
        console.log('     - Data validatie en cleaning');
        console.log('     - Auto-classificatie als investor of broker');
        console.log('     - Bulk upload naar Firebase');
        console.log('     - Preview functionaliteit met editing');
        console.log('     - Proper error handling en user feedback');
        console.log('   • 🏢 BROKER MANAGEMENT IN CONTACTEN TAB');
        console.log('     - Unified contacten interface voor investeerders én brokers');
        console.log('     - Broker-specifieke velden: specialisaties, werkgebied, track record');
        console.log('     - Enhanced AI classificatie voor broker detection');
        console.log('     - Aparte database collection voor brokers');
        console.log('     - Filter functionaliteit: Alle / Investeerders / Brokers');
        console.log('   • 🗺️ VEREENVOUDIGDE LOCATIE INVOER');
        console.log('     - Minder dropdowns, meer vrije tekst input');
        console.log('     - Hoofdlanden selectie in plaats van 150+ steden');
        console.log('     - Vrije tekst veld voor specifieke locatie eisen');
        console.log('   • 🤖 AI SEMANTIC MATCHING');
        console.log('     - AI matcht investment motivatie vs deal beschrijving');
        console.log('     - Keyword matching: "stabiele huurinkomsten" ↔ "gegarandeerde huurder"');
        console.log('     - Conflict detectie: "geen renovatie" vs "renovatie project"');
        console.log('     - Enhanced compatibility scoring met semantic analyse');
        console.log('   • 💬 VRIJE TEKST INPUT FIELDS:');
        console.log('     - Investeerder: locatieDetails, investmentMotivatie, bijzonderheden');
        console.log('     - Broker: trackRecord, werkwijze, locatieDetails, bijzonderheden');
        console.log('     - Deal: bijzonderheden veld voor extra deal details');
        console.log('     - AI gebruikt deze teksten voor slimme matching');
        console.log('   • 🎯 ENHANCED MATCHING ALGORITHM:');
        console.log('     - Traditional scoring (budget, locatie, type) = 70%');
        console.log('     - NEW: Semantic matching van teksten = 30%');
        console.log('     - Conflict detectie tussen wensen en aanbod');
        console.log('     - Intelligente keyword matching');
        console.log('💰 Commissie Management behouden:');
        console.log('   • ✅ Per deal aanpasbare commissie rate');
        console.log('   • ✅ Meerdere deelnemers per deal');
        console.log('   • ✅ Externe partners met contactinfo');
        console.log('   • ✅ Percentage en vast bedrag combinaties');
        console.log('✏️ Edit Features behouden:');
        console.log('   • ✅ Investeerders én brokers bewerken en verwijderen');
        console.log('   • ✅ Deals bewerken en verwijderen');
        console.log('   • ✅ Real-time updates tussen teamleden');
        console.log('🌍 Alle andere features behouden:');
        console.log('   • ✅ AI-powered matching (enhanced!)');
        console.log('   • ✅ Team collaboration via Firebase');
        console.log('   • ✅ Transactie management');
        console.log('   • ✅ Commission tracking');
        console.log('📊 VERBETERDE USER EXPERIENCE:');
        console.log('   • Unified contact management voor investeerders en brokers');
        console.log('   • Smart filtering en categorisatie');
        console.log('   • Snellere data invoer door minder dropdowns');
        console.log('   • Genuanceerdere voorkeuren door vrije tekst');
        console.log('   • Betere matches door AI semantic analysis');
        console.log('   • Duidelijke feedback over waarom deals matchen');
        console.log('   • CSV upload voor bulk import van LinkedIn connecties');
        console.log('🔥 DEMO DATA ENHANCED:');
        console.log('   • Demo investeerder met uitgebreide motivatie tekst');
        console.log('   • Demo broker met professioneel profiel');
        console.log('   • Demo deal heeft gedetailleerde beschrijving');
        console.log('   • Toont semantic matching in actie');
        console.log('   • AI detecteert "stabiele huurinkomsten" ↔ "gegarandeerde huurder"');
        console.log('🏢 BROKER FEATURES:');
        console.log('   • Specialisaties tracking (Commercieel, Retail, etc.)');
        console.log('   • Werkgebied definitie en filtering');
        console.log('   • Track record en ervaring logging');
        console.log('   • Commissie structuur documentatie');
        console.log('   • Werkwijze en approach beschrijving');
        console.log('   • Visual distinction: groene accent kleur voor brokers');
        console.log('📤 CSV UPLOAD FEATURES:');
        console.log('   • Papa Parse integratie voor robuuste CSV parsing');
        console.log('   • Data cleaning en validatie');
        console.log('   • Automatic field mapping voor LinkedIn exports');
        console.log('   • Preview met classificatie editing');
        console.log('   • Bulk upload naar Firebase Firestore');
        console.log('   • Error handling en user feedback');
        console.log('   • Support voor beide investor en broker uploads');