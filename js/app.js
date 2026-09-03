// BusKid Main Application Logic - Guaranteed 100% Functional Driver GPS Map & Route Engine
import { MOCK_DATA } from './mockData.js';
import { BUSKID_SQL_SCHEMA } from './sqlSchema.js';

class BusKidApp {
  constructor() {
    this.data = MOCK_DATA;
    this.activeRole = 'driver';
    this.activeDriverTab = 'chamada';

    this.map = null;
    this.markers = [];
    this.studentMarkersMap = {};
    this.vanMarker = null;
    this.routePolyline = null;
    this.simulating = false;

    this.init();
  }

  init() {
    this.setupRoleSwitcher();
    this.setupDriverTabs();
    this.setupSimulationBar();
    this.setupAbsenceModal();
    this.setupProSubscription();
    this.renderRollcallList();
    this.renderFinancialsTable();
    this.renderMaintenanceHistory();
    this.renderSqlCode();
    this.setupCopySql();

    // Inicia a renderização do mapa imediatamente e re-invalida em vários intervalos
    this.initMapWithFallback();
  }

  // 1. Alternância de Perfis (Role Switcher)
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

  // 2. Abas do Motorista
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

  // 3. Inicializador Garantido do Mapa (Leaflet + Canvas GPS Fallback)
  initMapWithFallback() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    // Se a biblioteca Leaflet estiver carregada globalmente
    if (typeof L !== 'undefined') {
      try {
        const startLat = this.data.driver.currentLocation.lat;
        const startLng = this.data.driver.currentLocation.lng;

        if (!this.map) {
          this.map = L.map('map', {
            zoomControl: true,
            scrollWheelZoom: true,
            fadeAnimation: false
          }).setView([startLat, startLng], 14);

          // Tile Layer CartoDB Voyager / OSM (Altamente Confiável)
          L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            subdomains: 'abcd',
            attribution: '&copy; CartoDB & &copy; OpenStreetMap'
          }).addTo(this.map);
        }

        this.renderLeafletMapContent();
        
        // Múltiplos invalidates para assegurar carregamento de tiles
        [100, 300, 800, 1500].forEach(delay => {
          setTimeout(() => {
            if (this.map) this.map.invalidateSize();
          }, delay);
        });

      } catch (err) {
        console.warn('Leaflet fallback triggered:', err);
        this.renderInteractiveCanvasMap();
      }
    } else {
      // Se estiver offline ou sem CDN, usa o Mapa Canvas GPS Interativo de alta fidelidade
      this.renderInteractiveCanvasMap();
    }

    this.setupRecalculateRouteBtn();
    this.setupVanSimulationBtn();
  }

  // Renderizar Marcadores e Linha de Rota no Leaflet
  renderLeafletMapContent() {
    if (!this.map) return;

    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];
    this.studentMarkersMap = {};
    if (this.routePolyline) {
      this.map.removeLayer(this.routePolyline);
    }

    const waypoints = [];

    // 1. Marcador da Perua
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

    // 2. Marcadores das Casas dos Alunos
    this.data.studentsList.forEach(student => {
      let bg = '#F59E0B';
      let statusIcon = '🏠';

      if (student.status === 'EMBARCOU') {
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

    // 3. Marcador da Escola
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

    // 4. Traçado Polyline
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

  // MAPA CANVAS GPS INTERATIVO (FALLBACK 100% GARANTIDO)
  renderInteractiveCanvasMap() {
    const mapElem = document.getElementById('map');
    if (!mapElem) return;

    // Se o Leaflet já estiver ativo, não substitui por canvas
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

    // Fundo do Mapa (Radar GPS Dark)
    ctx.fillStyle = '#18181B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grelha de ruas fictícias de SP
    ctx.strokeStyle = '#27272A';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Desenha Avenidas Principais em Amarelo Escuro
    ctx.strokeStyle = '#3F3F46';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(50, 200); ctx.lineTo(canvas.width - 50, 200); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(250, 30); ctx.lineTo(250, canvas.height - 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(550, 30); ctx.lineTo(550, canvas.height - 30); ctx.stroke();

    // Posições Fictícias dos Nós da Rota no Canvas
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

    // Desenha Linha de Rota Amarela DTracejada
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

    // Desenha Marcadores nos Nós
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

      // Rótulo do Nome
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y - 18);
    });

    this.renderProximityChips();
  }

  // Renderizar Chips de Proximidade entre Paradas Consecutivas
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

  // Focar Câmera do Mapa no Aluno Selecionado (flyTo)
  focusStudentOnMap(studentId) {
    const student = this.data.studentsList.find(s => s.id === studentId);
    if (!student) return;

    if (this.activeRole !== 'driver') {
      document.querySelector('[data-role="driver"]')?.click();
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

  // Simular Movimento da Perua ponto a ponto
  setupVanSimulationBtn() {
    document.getElementById('btn-animate-van')?.addEventListener('click', () => {
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
      }

      step++;
    }, 1800);
  }

  // 4. Botão de Recálculo de Rota Otimizada com Estado Dinâmico
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

  // Algoritmo de Recálculo de Rota Dinâmica
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
      banner.style.display = 'flex';
      if (absentCount > 0) {
        const kmSaved = (absentCount * 1.8).toFixed(1);
        const minsSaved = absentCount * 6;
        bannerText.textContent = `🎉 Otimização Concluída! ${absentCount} aluno(s) com falta confirmada foram removidos da rota. Você economizou ~${minsSaved} minutos e ${kmSaved} km de combustível!`;
      } else {
        bannerText.textContent = `ℹ️ Todos os alunos estão confirmados na rota. Traçado GPS atualizado!`;
      }
    }

    const etaElem = document.getElementById('driver-eta-school');
    if (etaElem) {
      etaElem.textContent = absentCount > 0 ? '07:23 hs (-12 min)' : '07:35 hs';
    }

    this.showToast('🔄 Rota Recalculada! Paradas de alunos faltantes foram ignoradas no GPS.');
  }

  // 5. Simulação de Assinatura do Plano BusKid PRO nos Pais
  setupProSubscription() {
    document.getElementById('btn-subscribe-pro')?.addEventListener('click', () => {
      alert(`⭐ Assinatura do Plano BusKid PRO\n\nBenefícios liberados:\n- Rastreamento GPS ao vivo da perua no seu celular\n- Notificações automáticas de proximidade no portão\n\nValor: R$ 9,90/mês (Adicionado à mensalidade da perua).\n\nObrigado por apoiar a segurança do seu filho!`);
    });
  }

  // 6. Modal Interativo de Ausência com Transformação do Botão dos Pais
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
      const shiftSelect = document.getElementById('absence-shift');
      const shift = shiftSelect ? shiftSelect.value : 'Rota da Manhã';

      const sofia = this.data.studentsList.find(s => s.id === 'std_01');
      if (sofia) {
        sofia.status = 'FALTOU';
        sofia.statusTime = `07:05 (Motivo: ${reason})`;
      }

      closeModal();

      // MUTAÇÃO DO BOTÃO DOS PAIS PARA "✓ MOTORISTA NOTIFICADO!"
      const wrapper = document.getElementById('parent-absence-button-wrapper');
      if (wrapper) {
        wrapper.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn-action" disabled style="background: #065F46; color: #FFFFFF; cursor: not-allowed; opacity: 0.95;">
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

      // Exibe Alerta de Ausência no Painel do Motorista
      const alertBanner = document.getElementById('driver-absence-alert');
      const alertBody = document.getElementById('alert-body');
      if (alertBanner && alertBody) {
        alertBody.textContent = `Sofia Mendes (Mãe: Mariana) confirmou FALTA na ${shift}. Motivo selecionado: "${reason}". O motorista não precisa passar no endereço (Rua das Flores, 120).`;
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

  // Desfazer Aviso de Falta dos Pais
  undoAbsenceNotice() {
    const sofia = this.data.studentsList.find(s => s.id === 'std_01');
    if (sofia) {
      sofia.status = 'AGUARDANDO';
      sofia.statusTime = null;
    }

    const wrapper = document.getElementById('parent-absence-button-wrapper');
    if (wrapper) {
      wrapper.innerHTML = `
        <button class="btn-action" id="btn-open-absence-modal" style="background: #EF4444; color: #FFFFFF; font-size: 0.9rem; padding: 0.75rem 1.25rem;">
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

  // 7. Render da Chamada do Motorista com Transformação Dinâmica de Botões
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
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <button class="btn-action btn-focus-map" data-id="${student.id}" style="padding: 0.4rem 0.6rem; font-size: 0.78rem; background: #3B82F6;">
              📍 Ver no Mapa
            </button>
            
            ${isBoarded 
              ? `<button class="btn-action" disabled style="padding: 0.4rem 0.6rem; font-size: 0.78rem; background: #065F46; cursor: not-allowed;">✓ Embarcado (${student.statusTime})</button>`
              : `<button class="btn-action btn-set-status" data-id="${student.id}" data-status="EMBARCOU" style="padding: 0.4rem 0.6rem; font-size: 0.78rem;">🟡 Embarcou</button>`
            }

            ${isDelivered
              ? `<button class="btn-action" disabled style="padding: 0.4rem 0.6rem; font-size: 0.78rem; background: #047857; cursor: not-allowed;">✓ Entregue na Escola</button>`
              : `<button class="btn-action btn-set-status" data-id="${student.id}" data-status="NA_ESCOLA" style="padding: 0.4rem 0.6rem; font-size: 0.78rem; background: #10B981;">🟢 Entregue</button>`
            }

            ${isAbsent
              ? `<button class="btn-action" disabled style="padding: 0.4rem 0.6rem; font-size: 0.78rem; background: #991B1B; cursor: not-allowed;">✖ Falta Confirmada</button>`
              : `<button class="btn-action btn-set-status" data-id="${student.id}" data-status="FALTOU" style="padding: 0.4rem 0.6rem; font-size: 0.78rem; background: #EF4444;">🔴 Faltou</button>`
            }

            <button class="btn-action btn-whatsapp btn-send-wa" data-phone="${student.parentPhone}" data-name="${student.name}" style="padding: 0.4rem 0.6rem; font-size: 0.78rem;">
              💬 Whats
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    const countElem = document.getElementById('driver-boarded-count');
    if (countElem) {
      countElem.textContent = `${boardedCount} / ${this.data.studentsList.length}`;
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

  // 8. Atualizar Status do Aluno
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

  // 9. Atualizar Visão dos Pais
  updateParentView() {
    const child = this.data.studentsList.find(s => s.id === 'std_01');
    if (!child) return;

    const badge = document.getElementById('parent-child-status-badge');
    const headline = document.getElementById('parent-status-headline');
    const subtext = document.getElementById('parent-status-subtext');
    const progressBar = document.getElementById('parent-progress-bar');

    if (!badge || !headline) return;

    if (child.status === 'EMBARCOU') {
      badge.className = 'badge badge-yellow';
      badge.textContent = '🟡 EM TRÂNSITO NA PERUA';
      headline.textContent = 'Sofia está a caminho da escola!';
      subtext.textContent = `Embarcou às ${child.statusTime || '07:14'} hs na Perua 04 do Tio Carlos.`;
      if (progressBar) progressBar.style.width = '70%';
    } else if (child.status === 'NA_ESCOLA') {
      badge.className = 'badge badge-green';
      badge.textContent = '🟢 ENTREGUE NA ESCOLA';
      headline.textContent = 'Sofia já está na escola com segurança! 🎉';
      subtext.textContent = `Entregue no portão da escola às ${child.statusTime || '07:35'} hs.`;
      if (progressBar) progressBar.style.width = '100%';
    } else if (child.status === 'FALTOU') {
      badge.className = 'badge badge-red';
      badge.textContent = '🔴 FALTOU HOJE';
      headline.textContent = 'Sofia não vai de perua hoje';
      subtext.textContent = `Falta comunicada no app (${child.statusTime || 'Aviso no App'}). O motorista foi notificado.`;
      if (progressBar) progressBar.style.width = '0%';
    } else {
      badge.className = 'badge badge-yellow';
      badge.textContent = '🟡 AGUARDANDO PERUA';
      headline.textContent = 'Sofia está aguardando a perua em casa';
      subtext.textContent = 'Horário previsto de coleta: 07:10 hs na Perua 04 do Tio Carlos.';
      if (progressBar) progressBar.style.width = '25%';
    }
  }

  // 10. Atualizar Visão da Escola
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

  // 11. Simulações da Barra Superior
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

    document.getElementById('sim-whatsapp')?.addEventListener('click', () => {
      this.showToast('💬 Notificação automática disparada para os pais no WhatsApp!');
    });

    document.getElementById('btn-broadcast-pix')?.addEventListener('click', () => {
      this.showToast('📲 Lembrete de pagamento com Chave PIX enviado para os pais pendentes!');
    });

    document.getElementById('btn-show-pix-parent')?.addEventListener('click', () => {
      alert(`Chave PIX da Perua BusKid:\n\n${this.data.parentUser.child.pixCode}\n\nFavor enviar comprovante para o Tio Carlos.`);
    });
  }

  // 12. Tabela de Financeiro
  renderFinancialsTable() {
    const tbody = document.getElementById('financials-table-body');
    if (!tbody) return;

    let html = '';
    this.data.financials.records.forEach(rec => {
      const badgeClass = rec.status === 'PAGO' ? 'badge-green' : 'badge-yellow';
      html += `
        <tr style="border-bottom: 1px solid var(--bg-pastel-yellow);">
          <td style="padding: 0.75rem;"><strong>${rec.student}</strong></td>
          <td>${rec.parent}</td>
          <td>R$ ${rec.amount.toFixed(2)}</td>
          <td>${rec.dueDate}</td>
          <td><span class="badge ${badgeClass}">${rec.status}</span></td>
          <td>
            ${rec.status === 'PENDENTE' 
              ? `<button class="btn-action btn-whatsapp" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="this.textContent='✓ PIX Enviado!'; this.disabled=true; alert('Lembrete PIX enviado para ${rec.parent}!');">Cobrar PIX</button>`
              : '<span style="color: var(--status-green); font-weight: 700;">✓ Ok</span>'}
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  // 13. Histórico de Manutenção
  renderMaintenanceHistory() {
    const container = document.getElementById('maintenance-history-list');
    if (!container) return;

    let html = '<ul style="list-style: none; line-height: 1.8;">';
    this.data.maintenanceLogs.forEach(m => {
      html += `
        <li style="border-bottom: 1px solid rgba(0,0,0,0.05); padding: 0.5rem 0;">
          <strong>${m.date}</strong> - ${m.item} 
          <span style="color: var(--text-muted);">(${m.km} km)</span>: 
          <span style="color: var(--amber-warning); font-weight: 700;">R$ ${m.cost.toFixed(2)}</span>
        </li>
      `;
    });
    html += '</ul>';
    container.innerHTML = html;
  }

  // 14. Código SQL Render
  renderSqlCode() {
    const container = document.getElementById('sql-code-container');
    if (container) {
      container.textContent = BUSKID_SQL_SCHEMA;
    }
  }

  setupCopySql() {
    const btn = document.getElementById('btn-copy-sql');
    btn?.addEventListener('click', () => {
      navigator.clipboard.writeText(BUSKID_SQL_SCHEMA).then(() => {
        btn.innerHTML = '✓ Script SQL Copiado!';
        btn.style.background = '#10B981';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = '📋 Copiar Script SQL Completo';
          btn.style.background = 'var(--dark-obsidian)';
          btn.disabled = false;
        }, 3000);

        this.showToast('📋 Script SQL copiado para a área de transferência!');
      });
    });
  }

  // Toast Notification Generator
  showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<span>🚌</span> <div>${message}</div>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new BusKidApp();
});
