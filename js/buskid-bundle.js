// BusKid Standalone High-Performance Application Bundle
// Complete Freemium & TCC Model + Clean OSM Map + BusKid Express + Van Quality Seal & Docs

(function () {
  'use strict';

  // 1. MOCK DATA STORE
  const MOCK_DATA = {
    driver: {
      id: "drv_01",
      name: "Carlos Eduardo (Tio Carlos)",
      phone: "(11) 98765-4321",
      rating: 4.9,
      tripsCompleted: 1240,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
      cnh: "04983920192 (Categoria D - MOPP)",
      experience: "8 anos de transporte escolar",
      currentLocation: { lat: -23.5550, lng: -46.6600, label: "Ponto Inicial da Perua (Garagem)" },
      plan: "premium",
      region: {
        zoneName: "Zona Oeste - São Paulo",
        assignedSchool: "Escola Cantinho do Saber",
        schoolId: "sch_01",
        neighborhoods: ["Jardim América", "Vila Nova", "Centro", "Jardim Primavera"],
        coverageRadiusKm: 5.0,
        totalSeats: 19,
        occupiedSeats: 14,
        availableSeats: 5
      },
      van: {
        model: "Mercedes-Benz Sprinter 516 CDi",
        year: 2023,
        plate: "ABC-1234",
        color: "Amarelo Escolar com Faixa Preta",
        seats: 19,
        detranSeal: "DETRAN-SP 2026/8849",
        photo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&auto=format&fit=crop&q=80",
        odometer: 48320,
        nextOilChangeKm: 50000,
        detranInspectionDate: "2026-11-15",
        tacographDueDate: "2027-02-10"
      }
    },
    
    school: {
      id: "sch_01",
      name: "Escola Cantinho do Saber",
      address: "Av. das Nações, 1500 - Jardim Primavera",
      lat: -23.5650,
      lng: -46.6400,
      phone: "(11) 3344-5566",
      coordinator: "Prof. Helena Vasconcelos",
      entryTime: "07:30",
      exitTime: "12:15",
      activeVansToday: 5,
      totalStudentsArriving: 42
    },

    parentUser: {
      id: "prt_01",
      name: "Mariana Mendes",
      phone: "(11) 99123-8877",
      email: "mariana.mendes@email.com",
      plan: "free",
      child: {
        id: "std_01",
        name: "Sofia Mendes",
        age: 7,
        grade: "2º Ano B - Ensino Fundamental",
        photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
        school: "Escola Cantinho do Saber",
        routeType: "Ida e Volta",
        monthlyFee: 400.00,
        paymentStatus: "PAGO",
        lastPaymentDate: "2026-08-05",
        pixCode: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865406400.005802BR5920BusKid Transporte6009Sao Paulo62070503***6304E2CA",
        allergies: "Alergia a Amendoim",
        emergencyContact: "Mariana (Mãe) - (11) 99123-8877"
      }
    },

    studentsList: [
      {
        id: "std_01",
        name: "Sofia Mendes",
        photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
        parentName: "Mariana Mendes",
        parentPhone: "5511991238877",
        address: "Rua das Flores, 120 - Ap 42",
        neighborhood: "Jardim América",
        lat: -23.5580,
        lng: -46.6570,
        pickupETA: "07:10",
        status: "AGUARDANDO",
        statusTime: null,
        notes: "Cinto de segurança de 3 pontos"
      },
      {
        id: "std_02",
        name: "Lucas Rocha",
        photo: "https://images.unsplash.com/photo-1595454812294-050f7574b6f1?w=150&auto=format&fit=crop&q=80",
        parentName: "Roberto Rocha",
        parentPhone: "5511988776655",
        address: "Alameda dos Anjos, 45",
        neighborhood: "Jardim América",
        lat: -23.5600,
        lng: -46.6520,
        pickupETA: "07:18",
        status: "EMBARCOU",
        statusTime: "07:20",
        notes: "Leva mochila pesada de robótica"
      },
      {
        id: "std_03",
        name: "Pedro Alves",
        photo: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&auto=format&fit=crop&q=80",
        parentName: "Carla Alves",
        parentPhone: "5511977665544",
        address: "Rua São João, 88",
        neighborhood: "Vila Nova",
        lat: -23.5620,
        lng: -46.6480,
        pickupETA: "07:25",
        status: "AGUARDANDO",
        statusTime: null,
        notes: "Esperar até 3min no portão"
      },
      {
        id: "std_04",
        name: "Beatriz Lima",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        parentName: "Fernanda Lima",
        parentPhone: "5511966554433",
        address: "Av. Brasil, 302",
        neighborhood: "Vila Nova",
        lat: -23.5635,
        lng: -46.6450,
        pickupETA: "07:28",
        status: "AGUARDANDO",
        statusTime: null,
        notes: ""
      },
      {
        id: "std_05",
        name: "Gabriel Santos",
        photo: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=150&auto=format&fit=crop&q=80",
        parentName: "Juliana Santos",
        parentPhone: "5511955443322",
        address: "Rua XV de Novembro, 10",
        neighborhood: "Centro",
        lat: -23.5510,
        lng: -46.6380,
        pickupETA: "07:32",
        status: "FALTOU",
        statusTime: "07:05 (Avisou no app)",
        notes: "Consulta médica hoje de manhã"
      }
    ],

    financials: {
      currentMonth: "Agosto / 2026",
      totalExpected: 4800.00,
      fuelCostEstimated: 940.00,
      maintenanceCost: 450.00,
      estimatedProfit: 3410.00,
      records: [
        { student: "Sofia Mendes", parent: "Mariana Mendes", amount: 400.00, dueDate: "10/08/2026", status: "PAGO", payDate: "05/08/2026" },
        { student: "Lucas Rocha", parent: "Roberto Rocha", amount: 400.00, dueDate: "10/08/2026", status: "PENDENTE", payDate: null },
        { student: "Pedro Alves", parent: "Carla Alves", amount: 400.00, dueDate: "10/08/2026", status: "PENDENTE", payDate: null },
        { student: "Beatriz Lima", parent: "Fernanda Lima", amount: 400.00, dueDate: "10/08/2026", status: "PAGO", payDate: "09/08/2026" }
      ]
    },

    maintenanceLogs: [
      { date: "02/08/2026", item: "Abastecimento Diesel S10", km: 48250, cost: 320.00, type: "Combustível" },
      { date: "15/07/2026", item: "Troca de Pastilhas de Freio", km: 46500, cost: 580.00, type: "Manutenção" },
      { date: "01/06/2026", item: "Vistoria Semestral DETRAN-SP", km: 44000, cost: 450.00, type: "Documentação" }
    ]
  };

  const BUSKID_SQL_SCHEMA = `-- BUSKID POSTGRESQL SCHEMA (DOCUMENTAÇÃO DA VAN & SEGURANÇA)
CREATE TABLE usuarios ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), nome VARCHAR(120), tipo_perfil VARCHAR(20), plano_assinado VARCHAR(20) DEFAULT 'free' );
CREATE TABLE veiculos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  placa VARCHAR(10),
  modelo VARCHAR(100),
  selo_detran VARCHAR(50),
  data_vistoria_detran DATE,
  validade_tacografo DATE,
  alvara_municipal VARCHAR(50),
  motorista_id UUID REFERENCES usuarios(id)
);
CREATE TABLE alunos ( id UUID PRIMARY KEY, nome VARCHAR(120), responsavel_id UUID REFERENCES usuarios(id) );
`;

  // 2. MAIN APPLICATION CLASS
  class BusKidApp {
    constructor() {
      this.data = MOCK_DATA;
      this.activeRole = 'driver';
      this.activeDriverTab = 'chamada';
      this.currentTheme = localStorage.getItem('buskid_theme') || 'light';
      this.pendingExpressOffer = null;

      this.map = null;
      this.markers = [];
      this.studentMarkersMap = {};
      this.vanMarker = null;
      this.routePolyline = null;

      this.init();
    }

    init() {
      this.applyTheme(this.currentTheme);
      this.setupSettingsModal();
      this.setupRoleSwitcher();
      this.setupDriverTabs();
      this.setupSimulationBar();
      this.setupAbsenceModal();
      this.setupProSubscription();
      this.setupTccFeatures();
      this.setupExpressRequestModal();
      this.setupDriverExpressOffer();
      this.setupParentVanDocsModal();
      this.setupDriverVanDocsModal();
      this.renderRollcallList();
      this.renderFinancialsTable();
      this.renderMaintenanceHistory();
      this.renderSqlCode();
      this.setupCopySql();

      setTimeout(() => {
        this.initMapWithFallback();
      }, 150);
    }

    applyTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('buskid_theme', theme);

      const quickBtn = document.getElementById('btn-quick-theme-toggle');
      const modalBtn = document.getElementById('btn-modal-theme-toggle');
      const label = theme === 'dark' ? '🌙 Modo Escuro' : '☀️ Modo Claro';

      if (quickBtn) quickBtn.innerHTML = label;
      if (modalBtn) modalBtn.innerHTML = label;
    }

    toggleTheme() {
      const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme(nextTheme);
      this.showToast(`🎨 Tema alterado para: ${nextTheme === 'dark' ? 'Modo Escuro 🌙' : 'Modo Claro ☀️'}`);
    }

    setupSettingsModal() {
      const modal = document.getElementById('modal-settings');
      const btnOpen = document.getElementById('btn-open-settings');
      const btnClose = document.getElementById('btn-close-settings');
      const btnSave = document.getElementById('btn-save-settings');
      const fontSizeSelect = document.getElementById('select-font-size');

      btnOpen?.addEventListener('click', () => {
        if (modal) modal.style.display = 'flex';
      });

      const closeModal = () => {
        if (modal) modal.style.display = 'none';
      };

      btnClose?.addEventListener('click', closeModal);

      btnSave?.addEventListener('click', () => {
        const fontVal = fontSizeSelect ? fontSizeSelect.value : 'normal';
        document.documentElement.setAttribute('data-font-size', fontVal);
        closeModal();
        this.showToast('✓ Configurações salvas com sucesso!');
      });
    }

    setupRoleSwitcher() {
      const roleBtns = document.querySelectorAll('.role-btn');
      roleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const targetRole = e.currentTarget.getAttribute('data-role');
          
          roleBtns.forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.role-view').forEach(v => v.classList.remove('active'));

          e.currentTarget.classList.add('active');
          const viewElement = document.getElementById(`view-${targetRole}`);
          if (viewElement) {
            viewElement.classList.add('active');
          }

          this.activeRole = targetRole;

          if (targetRole === 'driver') {
            setTimeout(() => {
              if (this.map) this.map.invalidateSize();
              this.renderInteractiveCanvasMap();
            }, 100);
          }
        });
      });
    }

    setupDriverTabs() {
      const driverTabBtns = document.querySelectorAll('[data-driver-tab]');
      driverTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const targetSubtab = e.currentTarget.getAttribute('data-driver-tab');

          driverTabBtns.forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.driver-subtab').forEach(t => t.style.display = 'none');

          e.currentTarget.classList.add('active');
          const subtabElement = document.getElementById(`driver-tab-${targetSubtab}`);
          if (subtabElement) {
            subtabElement.style.display = 'block';
          }

          this.activeDriverTab = targetSubtab;
        });
      });
    }

    // MODAL DE DOCUMENTAÇÃO DA PERUA PARA OS PAIS
    setupParentVanDocsModal() {
      const modal = document.getElementById('modal-parent-van-docs');
      const btnOpen = document.getElementById('btn-open-parent-docs-modal');
      const btnClose = document.getElementById('btn-close-parent-docs-modal');
      const btnConfirm = document.getElementById('btn-close-parent-docs-confirm');

      if (!modal) return;

      btnOpen?.addEventListener('click', () => {
        modal.style.display = 'flex';
      });

      const closeModal = () => {
        modal.style.display = 'none';
      };

      btnClose?.addEventListener('click', closeModal);
      btnConfirm?.addEventListener('click', closeModal);
    }

    // MODAL DE EDIÇÃO DE VISTORIAS PELO MOTORISTA
    setupDriverVanDocsModal() {
      const modal = document.getElementById('modal-driver-edit-docs');
      const btnOpen = document.getElementById('btn-open-driver-docs-modal');
      const btnClose = document.getElementById('btn-close-driver-docs-modal');
      const btnCancel = document.getElementById('btn-cancel-driver-docs');
      const form = document.getElementById('form-driver-update-docs');

      if (!modal) return;

      btnOpen?.addEventListener('click', () => {
        modal.style.display = 'flex';
      });

      const closeModal = () => {
        modal.style.display = 'none';
      };

      btnClose?.addEventListener('click', closeModal);
      btnCancel?.addEventListener('click', closeModal);

      form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const dateVal = document.getElementById('input-detran-date').value;
        const sealVal = document.getElementById('input-detran-seal').value;

        if (dateVal) {
          const parts = dateVal.split('-');
          const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

          this.data.driver.van.detranInspectionDate = dateVal;
          this.data.driver.van.detranSeal = sealVal;

          const labelDriver = document.getElementById('driver-doc-detran-label');
          const labelParent = document.getElementById('parent-modal-detran-date');

          if (labelDriver) labelDriver.textContent = `Válido até ${formattedDate} (Selo nº ${sealVal})`;
          if (labelParent) labelParent.textContent = `Válida até ${formattedDate} (Selo nº ${sealVal})`;
        }

        closeModal();
        this.showToast('🛡️ Vistorias da Sprinter atualizadas com sucesso e enviadas aos pais!');
      });
    }

    setupExpressRequestModal() {
      const modal = document.getElementById('modal-express-request');
      const btnOpen = document.getElementById('btn-open-express-modal');
      const btnClose = document.getElementById('btn-close-express-modal');
      const btnCancel = document.getElementById('btn-cancel-express');
      const form = document.getElementById('form-express-request');
      const selectLocation = document.getElementById('express-pickup-location');
      const labelDeviation = document.getElementById('express-deviation-label');
      const priceLabel = document.getElementById('express-calculated-price');

      if (!modal) return;

      btnOpen?.addEventListener('click', () => {
        modal.style.display = 'flex';
      });

      const closeModal = () => {
        modal.style.display = 'none';
      };

      btnClose?.addEventListener('click', closeModal);
      btnCancel?.addEventListener('click', closeModal);

      selectLocation?.addEventListener('change', () => {
        const val = selectLocation.value;
        if (val === 'near') {
          if (labelDeviation) labelDeviation.textContent = 'Desvio estimado: +800 metros (+4 min)';
          if (priceLabel) priceLabel.textContent = 'R$ 28,50';
        } else if (val === 'medium') {
          if (labelDeviation) labelDeviation.textContent = 'Desvio estimado: +1.8 km (+7 min)';
          if (priceLabel) priceLabel.textContent = 'R$ 38,00';
        } else if (val === 'far') {
          if (labelDeviation) labelDeviation.textContent = 'Desvio estimado: +3.2 km (+12 min)';
          if (priceLabel) priceLabel.textContent = 'R$ 48,50';
        }
      });

      form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const childName = document.getElementById('express-child-name').value || 'Enzo Gabriel';
        const locVal = selectLocation.value;

        let address = 'Rua Augusta, 850 (Consolação)';
        let lat = -23.5530;
        let lng = -46.6530;
        let deviation = '+800 metros';
        let timeAdd = '+4 minutos';
        let price = 28.50;

        if (locVal === 'medium') {
          address = 'Rua Frei Caneca, 400 (Consolação)';
          lat = -23.5540;
          lng = -46.6510;
          deviation = '+1.8 km';
          timeAdd = '+7 minutos';
          price = 38.00;
        } else if (locVal === 'far') {
          address = 'Av. Rebouças, 1200 (Pinheiros)';
          lat = -23.5610;
          lng = -46.6620;
          deviation = '+3.2 km';
          timeAdd = '+12 minutos';
          price = 48.50;
        }

        this.pendingExpressOffer = {
          childName,
          parentName: "Marcelo Gabriel",
          address,
          lat,
          lng,
          deviation,
          timeAdd,
          price
        };

        closeModal();

        document.getElementById('express-banner-child-name').textContent = childName;
        document.getElementById('express-banner-address').textContent = address;
        document.getElementById('express-banner-deviation').textContent = `🚗 Desvio da Rota Original: ${deviation}`;
        document.getElementById('express-banner-time').textContent = `⏱️ Tempo Adicional: ${timeAdd}`;
        document.getElementById('express-banner-price-tag').textContent = `+ R$ ${price.toFixed(2).replace('.', ',')} no PIX`;
        document.getElementById('driver-express-offer-banner').style.display = 'block';

        this.showToast(`⚡ Proposta de corrida avulsa enviada ao Tio Carlos (R$ ${price.toFixed(2).replace('.', ',')})!`);

        setTimeout(() => {
          const driverBtn = document.querySelector('[data-role="driver"]');
          if (driverBtn) driverBtn.click();
        }, 1200);
      });
    }

    setupDriverExpressOffer() {
      const banner = document.getElementById('driver-express-offer-banner');
      const btnAccept = document.getElementById('btn-accept-express-offer');
      const btnReject = document.getElementById('btn-reject-express-offer');

      btnAccept?.addEventListener('click', () => {
        if (!this.pendingExpressOffer) return;

        const offer = this.pendingExpressOffer;

        const newStudentId = `std_express_${Date.now()}`;
        this.data.studentsList.splice(2, 0, {
          id: newStudentId,
          name: `${offer.childName} (Avulso Express)`,
          photo: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80",
          parentName: offer.parentName,
          parentPhone: "5511999887766",
          address: offer.address,
          neighborhood: "Consolação",
          lat: offer.lat,
          lng: offer.lng,
          pickupETA: "07:22",
          status: "AGUARDANDO",
          statusTime: null,
          notes: `Corrida Avulsa BusKid Express (R$ ${offer.price.toFixed(2)})`
        });

        this.data.financials.records.push({
          student: `${offer.childName} (Avulso Express)`,
          parent: offer.parentName,
          amount: offer.price,
          dueDate: "HOJE (PIX)",
          status: "PAGO",
          payDate: "Hoje"
        });

        this.data.financials.totalExpected += offer.price;
        this.data.financials.estimatedProfit += offer.price;

        const statFat = document.getElementById('stat-faturamento');
        const statLuc = document.getElementById('stat-lucro');
        if (statFat) statFat.textContent = `R$ ${this.data.financials.totalExpected.toFixed(2).replace('.', ',')}`;
        if (statLuc) statLuc.textContent = `R$ ${this.data.financials.estimatedProfit.toFixed(2).replace('.', ',')}`;

        banner.style.display = 'none';

        this.renderRollcallList();
        this.renderFinancialsTable();
        this.recalculateRoute();

        this.showToast(`🟢 Proposta Aceita! ${offer.childName} adicionado à chamada e +R$ ${offer.price.toFixed(2).replace('.', ',')} creditados no seu PIX!`);
      });

      btnReject?.addEventListener('click', () => {
        banner.style.display = 'none';
        this.showToast('🔴 Proposta de corrida avulsa recusada com cortesia.');
      });
    }

    setupTccFeatures() {
      const planBtn = document.getElementById('btn-toggle-driver-plan');
      planBtn?.addEventListener('click', () => {
        if (this.data.driver.plan === 'premium') {
          this.data.driver.plan = 'free';
          planBtn.innerHTML = '🆓 Plano Perueiro: Gratuito (R$ 0)';
          planBtn.style.background = '#E5E7EB';
          planBtn.style.color = '#111827';
          document.getElementById('driver-premium-demand-card').style.display = 'none';
          this.showToast('ℹ️ Alternado para o Plano Gratuito do Perueiro (Segurança & 1 Rota R$ 0).');
        } else {
          this.data.driver.plan = 'premium';
          planBtn.innerHTML = '💎 Plano Perueiro: Premium (R$ 24,90)';
          planBtn.style.background = 'var(--yellow-brand)';
          planBtn.style.color = '#09090B';
          document.getElementById('driver-premium-demand-card').style.display = 'block';
          this.showToast('💎 Alternado para o Plano Premium do Perueiro (Demandas, Match & Otimização)!');
        }
      });

      document.getElementById('btn-trigger-15min-alert')?.addEventListener('click', () => {
        alert(`🔔 NOTIFICAÇÃO DISPARADA AOS PAIS (15 MINUTOS ANTES DA ROTA)\n\n"Olá Mariana! A Perua 04 do Tio Carlos sairá em 15 minutos para a Escola Cantinho do Saber. Confirmar presença da Sofia?"\n\n(Diferencial 3 do TCC em Ação!)`);
        this.showToast('🔔 Notificação de presença 15 min antes enviada para todos os pais no celular!');
      });

      document.querySelectorAll('.btn-match-accept').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.currentTarget.textContent = '✓ Match Aceito!';
          e.currentTarget.style.background = '#10B981';
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.disabled = true;

          this.showToast('🎯 Match realizado! 3 novos alunos integrados à sua rota.');
        });
      });
    }

    initMapWithFallback() {
      const mapContainer = document.getElementById('map-container');
      if (!mapContainer) return;

      if (typeof L !== 'undefined') {
        try {
          const startLat = this.data.driver.currentLocation.lat;
          const startLng = this.data.driver.currentLocation.lng;

          if (!this.map) {
            this.map = L.map('map', {
              zoomControl: false,
              scrollWheelZoom: true,
              fadeAnimation: false
            }).setView([startLat, startLng], 14);

            L.control.zoom({ position: 'topright' }).addTo(this.map);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; OpenStreetMap'
            }).addTo(this.map);
          }

          this.renderLeafletMapContent();

          [100, 300, 800, 1500].forEach(delay => {
            setTimeout(() => {
              if (this.map) this.map.invalidateSize();
            }, delay);
          });

        } catch (err) {
          console.warn('Leaflet fallback:', err);
          this.renderInteractiveCanvasMap();
        }
      } else {
        this.renderInteractiveCanvasMap();
      }

      this.setupRecalculateRouteBtn();
      this.setupVanSimulationBtn();
    }

    renderLeafletMapContent() {
      if (!this.map) return;

      this.markers.forEach(m => this.map.removeLayer(m));
      this.markers = [];
      this.studentMarkersMap = {};
      if (this.routePolyline) {
        this.map.removeLayer(this.routePolyline);
      }

      const waypoints = [];

      const vanLoc = this.data.driver.currentLocation;
      const vanIcon = L.divIcon({
        className: 'custom-leaflet-van',
        html: `<div style="background: #EAB308; color: #09090B; padding: 6px 10px; border-radius: 20px; font-weight: 800; font-size: 13px; border: 2px solid #09090B; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">🚐 PERUA 04</div>`,
        iconSize: [80, 30],
        iconAnchor: [40, 15]
      });
      this.vanMarker = L.marker([vanLoc.lat, vanLoc.lng], { icon: vanIcon }).addTo(this.map);
      this.vanMarker.bindPopup(`<b>Perua 04 (Tio Carlos)</b><br>Garagem / Ponto Inicial`);
      this.markers.push(this.vanMarker);
      waypoints.push([vanLoc.lat, vanLoc.lng]);

      this.data.studentsList.forEach(student => {
        let bg = '#F59E0B';
        let statusIcon = '🏠';

        if (student.name.includes('Avulso')) {
          bg = '#3B82F6';
          statusIcon = '⚡';
        } else if (student.status === 'EMBARCOU') {
          bg = '#10B981';
          statusIcon = '✅';
        } else if (student.status === 'NA_ESCOLA') {
          bg = '#10B981';
          statusIcon = '🏫';
        } else if (student.status === 'FALTOU') {
          bg = '#EF4444';
          statusIcon = '🚫';
        }

        const houseIcon = L.divIcon({
          className: 'custom-leaflet-house',
          html: `<div style="background: ${bg}; color: #FFFFFF; padding: 5px 9px; border-radius: 12px; font-size: 11px; font-weight: 800; border: 2px solid #FFFFFF; box-shadow: 0 3px 10px rgba(0,0,0,0.4); white-space: nowrap;">
                   ${statusIcon} ${student.name.split(' ')[0]}
                 </div>`,
          iconSize: [95, 26],
          iconAnchor: [47, 13]
        });

        const marker = L.marker([student.lat, student.lng], { icon: houseIcon }).addTo(this.map);
        marker.bindPopup(`<b>${student.name}</b><br>📍 ${student.address}<br>Bairro: <strong>${student.neighborhood}</strong><br>Status: <strong>${student.status}</strong>`);
        
        this.markers.push(marker);
        this.studentMarkersMap[student.id] = marker;

        if (student.status !== 'FALTOU') {
          waypoints.push([student.lat, student.lng]);
        }
      });

      const schoolLoc = this.data.school;
      const schoolIcon = L.divIcon({
        className: 'custom-leaflet-school',
        html: `<div style="background: #18181B; color: #FDE047; padding: 6px 12px; border-radius: 20px; font-weight: 800; font-size: 13px; border: 2px solid #FDE047; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">🏫 ESCOLA</div>`,
        iconSize: [95, 30],
        iconAnchor: [47, 15]
      });
      const schoolMarker = L.marker([schoolLoc.lat, schoolLoc.lng], { icon: schoolIcon }).addTo(this.map);
      schoolMarker.bindPopup(`<b>${schoolLoc.name}</b><br>Destino Final`);
      this.markers.push(schoolMarker);
      waypoints.push([schoolLoc.lat, schoolLoc.lng]);

      this.routePolyline = L.polyline(waypoints, {
        color: '#F59E0B',
        weight: 6,
        opacity: 0.9,
        dashArray: '10, 10',
        lineCap: 'round'
      }).addTo(this.map);

      this.map.fitBounds(this.routePolyline.getBounds(), { padding: [40, 40] });

      this.renderProximityChips();
    }

    renderInteractiveCanvasMap() {
      const mapElem = document.getElementById('map');
      if (!mapElem) return;

      if (this.map) {
        this.renderLeafletMapContent();
        return;
      }

      let canvas = document.getElementById('gps-canvas-map');
      if (!canvas) {
        mapElem.innerHTML = `<canvas id="gps-canvas-map" style="width:100%; height:100%; display:block; background:#18181B; border-radius:8px;"></canvas>`;
        canvas = document.getElementById('gps-canvas-map');
      }

      const ctx = canvas.getContext('2d');
      canvas.width = canvas.parentElement.clientWidth || 800;
      canvas.height = 420;

      ctx.fillStyle = '#18181B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      ctx.strokeStyle = '#3F3F46';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(50, 200); ctx.lineTo(canvas.width - 50, 200); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(250, 30); ctx.lineTo(250, canvas.height - 30); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(550, 30); ctx.lineTo(550, canvas.height - 30); ctx.stroke();

      const activeStudents = this.data.studentsList.filter(s => s.status !== 'FALTOU');
      const nodes = [
        { name: '🚐 PERUA 04', x: 70, y: 350, type: 'van' },
        ...activeStudents.map((s, idx) => ({
          name: `${s.name.split(' ')[0]} (${s.status})`,
          x: 150 + (idx * 130),
          y: 120 + ((idx % 2) * 160),
          type: 'student',
          status: s.status
        })),
        { name: '🏫 ESCOLA', x: canvas.width - 90, y: 100, type: 'school' }
      ];

      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      nodes.forEach((node, i) => {
        if (i === 0) ctx.moveTo(node.x, node.y);
        else ctx.lineTo(node.x, node.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      nodes.forEach(node => {
        let color = '#F59E0B';
        if (node.type === 'van') color = '#EAB308';
        else if (node.type === 'school') color = '#18181B';
        else if (node.status === 'EMBARCOU' || node.status === 'NA_ESCOLA') color = '#10B981';

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y - 18);
      });

      this.renderProximityChips();
    }

    renderProximityChips() {
      const chipsContainer = document.getElementById('proximity-chips-list');
      if (!chipsContainer) return;

      const activeStudents = this.data.studentsList.filter(s => s.status !== 'FALTOU');
      let html = '';

      if (activeStudents.length === 0) {
        chipsContainer.innerHTML = '<span style="font-size: 0.8rem; color: #A1A1AA;">Todos os alunos marcaram falta hoje.</span>';
        return;
      }

      const points = [
        { name: 'Garagem', lat: this.data.driver.currentLocation.lat, lng: this.data.driver.currentLocation.lng },
        ...activeStudents.map(s => ({ name: s.name.split(' ')[0], lat: s.lat, lng: s.lng, id: s.id })),
        { name: 'Escola', lat: this.data.school.lat, lng: this.data.school.lng }
      ];

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        const distKm = this.calcDistance(p1.lat, p1.lng, p2.lat, p2.lng);
        const distStr = distKm < 1 ? `${Math.round(distKm * 1000)}m` : `${distKm.toFixed(1)}km`;
        const timeMins = Math.max(1, Math.round(distKm * 3));

        html += `
          <span class="proximity-chip">
            ${p1.name} ➔ ${p2.name}: <strong>${distStr} (${timeMins} min)</strong>
          </span>
        `;
      }

      chipsContainer.innerHTML = html;
    }

    calcDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    focusStudentOnMap(studentId) {
      const student = this.data.studentsList.find(s => s.id === studentId);
      if (!student) return;

      if (this.activeRole !== 'driver') {
        const driverBtn = document.querySelector('[data-role="driver"]');
        if (driverBtn) driverBtn.click();
      }

      if (this.map) {
        this.map.flyTo([student.lat, student.lng], 16, { animate: true, duration: 1.2 });
        const marker = this.studentMarkersMap[studentId];
        if (marker) setTimeout(() => marker.openPopup(), 1200);
      } else {
        this.renderInteractiveCanvasMap();
      }

      this.showToast(`📍 Mapa focado na casa de ${student.name} (${student.neighborhood})`);
    }

    setupVanSimulationBtn() {
      const btn = document.getElementById('btn-animate-van');
      if (!btn) return;
      btn.addEventListener('click', () => {
        this.simulateVanMovement();
      });
    }

    simulateVanMovement() {
      const activeWaypoints = this.data.studentsList
        .filter(s => s.status !== 'FALTOU')
        .map(s => ({ name: s.name, lat: s.lat, lng: s.lng }));

      activeWaypoints.push({ name: 'Escola Cantinho do Saber', lat: this.data.school.lat, lng: this.data.school.lng });

      let step = 0;
      this.showToast('🚀 Simulação GPS iniciada: Perua em movimento no mapa do motorista!');

      const interval = setInterval(() => {
        if (step >= activeWaypoints.length) {
          clearInterval(interval);
          this.showToast('🏁 Perua chegou ao destino final (Escola)! Rota concluída.');
          return;
        }

        const wp = activeWaypoints[step];
        
        if (this.map && this.vanMarker) {
          this.vanMarker.setLatLng([wp.lat, wp.lng]);
          this.map.panTo([wp.lat, wp.lng], { animate: true });
          this.vanMarker.bindPopup(`<b>🚐 Perua 04 em Movimento</b><br>Chegou em: <strong>${wp.name}</strong>`).openPopup();
        } else {
          this.renderInteractiveCanvasMap();
        }

        step++;
      }, 1800);
    }

    setupRecalculateRouteBtn() {
      const btn = document.getElementById('btn-recalculate-route');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Recalculando...';
        btn.disabled = true;

        setTimeout(() => {
          this.recalculateRoute();
          btn.innerHTML = '✓ Rota Otimizada!';
          btn.style.background = '#10B981';
          btn.style.color = '#FFFFFF';

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = 'var(--yellow-brand)';
            btn.style.color = 'var(--dark-obsidian)';
          }, 3000);
        }, 600);
      });

      document.getElementById('btn-open-waze')?.addEventListener('click', () => {
        const activeStudents = this.data.studentsList.filter(s => s.status !== 'FALTOU');
        const nextStudent = activeStudents.find(s => s.status === 'AGUARDANDO') || activeStudents[0];
        if (nextStudent) {
          const wazeUrl = `https://www.waze.com/ul?ll=${nextStudent.lat},${nextStudent.lng}&navigate=yes`;
          window.open(wazeUrl, '_blank');
        } else {
          const wazeUrl = `https://www.waze.com/ul?ll=${this.data.school.lat},${this.data.school.lng}&navigate=yes`;
          window.open(wazeUrl, '_blank');
        }
      });
    }

    recalculateRoute() {
      if (this.map) {
        this.renderLeafletMapContent();
      } else {
        this.renderInteractiveCanvasMap();
      }

      const absentCount = this.data.studentsList.filter(s => s.status === 'FALTOU').length;
      const banner = document.getElementById('route-savings-banner');
      const bannerText = document.getElementById('route-savings-text');

      if (banner) {
        banner.style.display = 'block';
        if (absentCount > 0) {
          const kmSaved = (absentCount * 1.8).toFixed(1);
          const minsSaved = absentCount * 6;
          bannerText.textContent = `🎉 Rota Otimizada! ${absentCount} aluno(s) com falta confirmada foram removidos. Economia de ~${minsSaved} minutos e ${kmSaved} km!`;
        } else {
          bannerText.textContent = `ℹ️ Todos os alunos estão confirmados na rota. Traçado GPS atualizado!`;
        }
      }

      this.showToast('🔄 Rota Recalculada! Paradas de alunos faltantes foram ignoradas no GPS.');
    }

    setupProSubscription() {
      document.getElementById('btn-subscribe-pro')?.addEventListener('click', () => {
        alert(`⭐ Assinatura do Plano Premium Pais\n\nBenefícios liberados:\n- Rastreamento GPS ao vivo da perua no seu celular\n- Previsão de chegada do aluno (ETA exato)\n- Notificações automáticas 5 minutos antes no portão\n\nValor: R$ 7,90/mês (Adicionado à mensalidade da perua).\n\nLembrando: Recursos de segurança são 100% gratuitos!`);
      });
    }

    setupAbsenceModal() {
      const modal = document.getElementById('modal-absence');
      const btnOpen = document.getElementById('btn-open-absence-modal');
      const btnClose = document.getElementById('btn-close-modal');
      const btnCancel = document.getElementById('btn-cancel-absence');
      const form = document.getElementById('form-absence');
      const dismissAlertBtn = document.getElementById('btn-dismiss-alert');

      if (!modal) return;

      btnOpen?.addEventListener('click', () => {
        modal.style.display = 'flex';
      });

      const closeModal = () => {
        modal.style.display = 'none';
      };

      btnClose?.addEventListener('click', closeModal);
      btnCancel?.addEventListener('click', closeModal);

      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const reasonRadio = form.querySelector('input[name="absence-reason"]:checked');
        const reason = reasonRadio ? reasonRadio.value : 'Ausência Notificada';

        const sofia = this.data.studentsList.find(s => s.id === 'std_01');
        if (sofia) {
          sofia.status = 'FALTOU';
          sofia.statusTime = `07:05 (${reason})`;
        }

        closeModal();

        const wrapper = document.getElementById('parent-absence-button-wrapper');
        if (wrapper) {
          wrapper.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn-action" disabled style="background: #065F46; color: #FFFFFF; cursor: not-allowed; opacity: 0.95; width: 100%; justify-content: center;">
                ✓ Motorista Notificado! (Sofia não irá hoje)
              </button>
              <a href="#" id="link-undo-absence" style="color: #EF4444; font-size: 0.8rem; text-decoration: underline; font-weight: 700;">
                ↩️ Desfazer e confirmar presença
              </a>
            </div>
          `;

          document.getElementById('link-undo-absence')?.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.undoAbsenceNotice();
          });
        }

        const alertBanner = document.getElementById('driver-absence-alert');
        const alertBody = document.getElementById('alert-body');
        if (alertBanner && alertBody) {
          alertBody.textContent = `Sofia Mendes (Mãe: Mariana) confirmou FALTA. Motivo: "${reason}". O motorista não precisa passar no endereço (Rua das Flores, 120).`;
          alertBanner.style.display = 'flex';
        }

        this.renderRollcallList();
        this.updateParentView();
        this.updateSchoolView();
        this.recalculateRoute();

        this.showToast('🚨 Falta notificada com sucesso! O Tio Carlos recebeu o alerta e a rota foi otimizada.');
      });

      dismissAlertBtn?.addEventListener('click', () => {
        const alertBanner = document.getElementById('driver-absence-alert');
        if (alertBanner) alertBanner.style.display = 'none';
      });
    }

    undoAbsenceNotice() {
      const sofia = this.data.studentsList.find(s => s.id === 'std_01');
      if (sofia) {
        sofia.status = 'AGUARDANDO';
        sofia.statusTime = null;
      }

      const wrapper = document.getElementById('parent-absence-button-wrapper');
      if (wrapper) {
        wrapper.innerHTML = `
          <button class="btn-action" id="btn-open-absence-modal" style="background: #EF4444; color: #FFFFFF; font-size: 0.85rem; width: 100%; justify-content: center;">
            🚨 Avisar que Sofia NÃO VAI HOJE
          </button>
        `;
        this.setupAbsenceModal();
      }

      const alertBanner = document.getElementById('driver-absence-alert');
      if (alertBanner) alertBanner.style.display = 'none';

      this.renderRollcallList();
      this.updateParentView();
      this.updateSchoolView();
      this.recalculateRoute();

      this.showToast('🟡 Falta desfeita! Presença da Sofia reconfirmada na rota da perua.');
    }

    renderRollcallList() {
      const container = document.getElementById('students-rollcall-container');
      if (!container) return;

      let html = '';
      let boardedCount = 0;

      this.data.studentsList.forEach(student => {
        if (student.status === 'EMBARCOU' || student.status === 'NA_ESCOLA') {
          boardedCount++;
        }

        let badgeClass = 'badge-yellow';
        let statusLabel = 'AGUARDANDO';

        if (student.status === 'EMBARCOU') {
          badgeClass = 'badge-yellow';
          statusLabel = `🟡 EMBARCOU (${student.statusTime || ''})`;
        } else if (student.status === 'NA_ESCOLA') {
          badgeClass = 'badge-green';
          statusLabel = `🟢 NA ESCOLA (${student.statusTime || ''})`;
        } else if (student.status === 'FALTOU') {
          badgeClass = 'badge-red';
          statusLabel = `🔴 FALTOU (${student.statusTime || 'Aviso no App'})`;
        }

        const isBoarded = student.status === 'EMBARCOU';
        const isDelivered = student.status === 'NA_ESCOLA';
        const isAbsent = student.status === 'FALTOU';

        html += `
          <div class="student-row" data-id="${student.id}">
            <div class="student-info">
              <img src="${student.photo}" alt="${student.name}" class="student-avatar">
              <div class="student-details">
                <h4>${student.name} <span class="badge ${badgeClass}">${statusLabel}</span></h4>
                <p>📍 ${student.address} (${student.neighborhood}) | ⏰ Previsão: ${student.pickupETA}</p>
                <p style="color: #6B7280; font-size: 0.75rem;">👤 Pais: ${student.parentName} (${student.notes || 'Sem observações'})</p>
              </div>
            </div>
            <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
              <button class="btn-action btn-focus-map" data-id="${student.id}" style="padding: 0.35rem 0.55rem; font-size: 0.75rem; background: #3B82F6;">
                📍 Mapa
              </button>
              
              ${isBoarded 
                ? `<button class="btn-action" disabled style="padding: 0.35rem 0.55rem; font-size: 0.75rem; background: #065F46; cursor: not-allowed;">✓ Embarcou</button>`
                : `<button class="btn-action btn-set-status" data-id="${student.id}" data-status="EMBARCOU" style="padding: 0.35rem 0.55rem; font-size: 0.75rem;">🟡 Embarcou</button>`
              }

              ${isDelivered
                ? `<button class="btn-action" disabled style="padding: 0.35rem 0.55rem; font-size: 0.75rem; background: #047857; cursor: not-allowed;">✓ Entregue</button>`
                : `<button class="btn-action btn-set-status" data-id="${student.id}" data-status="NA_ESCOLA" style="padding: 0.35rem 0.55rem; font-size: 0.75rem; background: #10B981;">🟢 Entregue</button>`
              }

              ${isAbsent
                ? `<button class="btn-action" disabled style="padding: 0.35rem 0.55rem; font-size: 0.75rem; background: #991B1B; cursor: not-allowed;">✖ Faltou</button>`
                : `<button class="btn-action btn-set-status" data-id="${student.id}" data-status="FALTOU" style="padding: 0.35rem 0.55rem; font-size: 0.75rem; background: #EF4444;">🔴 Faltou</button>`
              }

              <button class="btn-action btn-whatsapp btn-send-wa" data-phone="${student.parentPhone}" data-name="${student.name}" style="padding: 0.35rem 0.55rem; font-size: 0.75rem;">
                💬 Whats
              </button>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;

      const countElem = document.getElementById('driver-boarded-count');
      if (countElem) {
        countElem.textContent = `${boardedCount} / ${this.data.studentsList.length} Embarcados`;
      }

      container.querySelectorAll('.btn-focus-map').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          this.focusStudentOnMap(id);
        });
      });

      container.querySelectorAll('.btn-set-status').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const status = e.currentTarget.getAttribute('data-status');
          this.updateStudentStatus(id, status);
        });
      });

      container.querySelectorAll('.btn-send-wa').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const phone = e.currentTarget.getAttribute('data-phone');
          const name = e.currentTarget.getAttribute('data-name');
          const msg = encodeURIComponent(`Olá! Aqui é o Tio Carlos da Perua BusKid. Passando para avisar sobre a rota do(a) ${name}!`);
          window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        });
      });
    }

    updateStudentStatus(studentId, newStatus) {
      const student = this.data.studentsList.find(s => s.id === studentId);
      if (!student) return;

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      student.status = newStatus;
      student.statusTime = timeStr;

      this.renderRollcallList();
      this.updateParentView();
      this.updateSchoolView();
      
      if (this.map) {
        this.renderLeafletMapContent();
      } else {
        this.renderInteractiveCanvasMap();
      }

      this.showToast(`Status de ${student.name} atualizado para: ${newStatus}`);
    }

    updateParentView() {
      const child = this.data.studentsList.find(s => s.id === 'std_01');
      if (!child) return;

      const badge = document.getElementById('parent-child-status-badge');
      const headline = document.getElementById('parent-status-headline');
      const subtext = document.getElementById('parent-status-subtext');

      if (!badge || !headline) return;

      if (child.status === 'EMBARCOU') {
        badge.className = 'badge badge-yellow';
        badge.textContent = '🟡 EM TRÂNSITO NA PERUA';
        headline.textContent = 'Sofia está a caminho da escola!';
        subtext.textContent = `Embarcou às ${child.statusTime || '07:14'} hs na Perua 04 do Tio Carlos.`;
      } else if (child.status === 'NA_ESCOLA') {
        badge.className = 'badge badge-green';
        badge.textContent = '🟢 ENTREGUE NA ESCOLA';
        headline.textContent = 'Sofia já está na escola com segurança! 🎉';
        subtext.textContent = `Entregue no portão da escola às ${child.statusTime || '07:35'} hs.`;
      } else if (child.status === 'FALTOU') {
        badge.className = 'badge badge-red';
        badge.textContent = '🔴 FALTOU HOJE';
        headline.textContent = 'Sofia não vai de perua hoje';
        subtext.textContent = `Falta comunicada no app (${child.statusTime || 'Aviso no App'}). O motorista foi notificado.`;
      } else {
        badge.className = 'badge badge-yellow';
        badge.textContent = '🟡 AGUARDANDO PERUA';
        headline.textContent = 'Sofia está aguardando a perua em casa';
        subtext.textContent = 'Horário previsto de coleta: 07:10 hs na Perua 04 do Tio Carlos.';
      }
    }

    updateSchoolView() {
      const van4Badge = document.getElementById('school-van4-status');
      if (!van4Badge) return;

      const allArrived = this.data.studentsList.every(s => s.status === 'NA_ESCOLA' || s.status === 'FALTOU');
      if (allArrived) {
        van4Badge.className = 'badge badge-green';
        van4Badge.textContent = '🟢 CHEGOU NO PORTÃO';
      } else {
        van4Badge.className = 'badge badge-yellow';
        van4Badge.textContent = '🟡 EM TRÂNSITO';
      }
    }

    setupSimulationBar() {
      document.getElementById('sim-pickup')?.addEventListener('click', () => {
        this.updateStudentStatus('std_01', 'EMBARCOU');
      });

      document.getElementById('sim-arrival')?.addEventListener('click', () => {
        this.data.studentsList.forEach(s => {
          if (s.status !== 'FALTOU') {
            s.status = 'NA_ESCOLA';
            s.statusTime = '07:35';
          }
        });
        this.renderRollcallList();
        this.updateParentView();
        this.updateSchoolView();
        if (this.map) this.renderLeafletMapContent();
        else this.renderInteractiveCanvasMap();
        this.showToast('🚐 A Perua 04 chegou na escola! Todos os alunos entregues em segurança.');
      });
    }

    renderFinancialsTable() {
      const tbody = document.getElementById('financials-table-body');
      if (!tbody) return;

      let html = '';
      this.data.financials.records.forEach(rec => {
        const badgeClass = rec.status === 'PAGO' ? 'badge-green' : 'badge-yellow';
        html += `
          <tr style="border-bottom: 1px solid var(--border-subtle);">
            <td style="padding: 0.4rem;"><strong>${rec.student}</strong></td>
            <td>R$ ${rec.amount.toFixed(2).replace('.', ',')}</td>
            <td><span class="badge ${badgeClass}">${rec.status}</span></td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
    }

    renderMaintenanceHistory() {
      const container = document.getElementById('maintenance-history-list');
      if (!container) return;

      let html = '<ul style="list-style: none; line-height: 1.6;">';
      this.data.maintenanceLogs.forEach(m => {
        html += `
          <li style="border-bottom: 1px solid var(--border-subtle); padding: 0.3rem 0;">
            <strong>${m.date}</strong> - ${m.item}: 
            <span style="color: var(--status-yellow); font-weight: 700;">R$ ${m.cost.toFixed(2)}</span>
          </li>
        `;
      });
      html += '</ul>';
      container.innerHTML = html;
    }

    renderSqlCode() {
      const container = document.getElementById('sql-code-container');
      if (container) {
        container.textContent = BUSKID_SQL_SCHEMA;
      }
    }

    setupCopySql() {
      const btn = document.getElementById('btn-copy-sql');
      btn?.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(BUSKID_SQL_SCHEMA).then(() => {
            btn.innerHTML = '✓ Script SQL Copiado!';
            btn.style.background = '#10B981';
            btn.disabled = true;

            setTimeout(() => {
              btn.innerHTML = '📋 Copiar SQL';
              btn.style.background = '#18181B';
              btn.disabled = false;
            }, 3000);

            this.showToast('📋 Script SQL copiado para a área de transferência!');
          });
        }
      });
    }

    showToast(message) {
      const existing = document.querySelector('.toast-notification');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.innerHTML = `<span>🛡️</span> <div>${message}</div>`;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.app = new BusKidApp();
    });
  } else {
    window.app = new BusKidApp();
  }

})();
