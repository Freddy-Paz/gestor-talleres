import { Link } from "react-router-dom";

export default function Sidebar() {
  const items = [
    { label: 'Alumnos', path: '/alumnos' },
    { label: 'Talleres', path: '/talleres' },
    { label: 'Inscripciones', path: '/inscripciones' },
    { label: 'Pagos', path: '/pagos' },
  ];

  return (
    <div className="bg-light border-end vh-100 p-3" style={{ width: '220px' }}>
      <div className="text-center mb-4">
        <img src="Logo-cetpro.jpg" alt="profile" width="180" />
      </div>
      <ul className="list-unstyled">
        {items.map((item, i) => (
          <li className="mb-5" key={i}>
            <Link
              to={item.path}
              className="text-decoration-none text-dark d-block px-2 py-1 rounded hover-shadow-blue fw-bold fs-4"
              style={{ transition: '0.3s' }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}