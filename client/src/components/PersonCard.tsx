import { Link } from 'wouter';
import { User } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  nameAr?: string;
  photo?: string;
  profession: string[];
  birthDate?: string;
  nationality?: string;
}

interface PersonCardProps {
  person: Person;
  role?: string;
  character?: string;
}

export default function PersonCard({ person, role, character }: PersonCardProps) {
  return (
    <div className="person-card">
      <Link href={`/person/${person.id}`}>
        <div className="person-image">
          {person.photo ? (
            <img 
              src={person.photo} 
              alt={person.name}
              className="rounded-circle"
              style={{width: '80px', height: '80px', objectFit: 'cover'}}
            />
          ) : (
            <div className="default-avatar bg-secondary rounded-circle d-flex align-items-center justify-content-center" 
                 style={{width: '80px', height: '80px'}}>
              <User size={40} className="text-white" />
            </div>
          )}
        </div>
        <div className="person-info text-center mt-2">
          <h6 className="person-name mb-1">{person.name}</h6>
          {character && (
            <div className="character-name text-muted small">({character})</div>
          )}
          {role && (
            <div className="person-role text-primary small">{role}</div>
          )}
        </div>
      </Link>
    </div>
  );
}