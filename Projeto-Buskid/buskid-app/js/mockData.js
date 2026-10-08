// BusKid Mock Data Store with Geolocation Coordinates & Driver Region Control
export const MOCK_DATA = {
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

    // CONTROLE DE REGIÃO DE ATUAÇÃO E ESCOLA CADASTRADA
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
      status: "AGUARDANDO", // 'AGUARDANDO', 'EMBARCOU', 'NA_ESCOLA', 'FALTOU'
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
    totalReceived: 4000.00,
    totalPending: 800.00,
    paidCount: 10,
    pendingCount: 2,
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
  ],

  adminMetrics: {
    activeVans: 24,
    totalStudents: 280,
    partnerSchools: 18,
    punctualityRate: "99.4%",
    monthlyGmv: "R$ 112.000,00"
  }
};
