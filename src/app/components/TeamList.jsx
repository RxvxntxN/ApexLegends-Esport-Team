'use client';
import { useState, useEffect } from 'react';
import { Card, CardFooter, CardBody, Image } from '@nextui-org/react';
import JoinRosterForm from './RosterForm';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch('/teams.json');
      const data = await response.json();
      setTeams(data.teams);
    };

    fetchTeams();
  }, []);

  const formatTeamNameToLogo = (teamName) => {
    return teamName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team); // Show form when a team is clicked
  };

  const handleFormSubmit = (data) => {
    console.log('Form Data:', data);
    // Handle form submission, e.g., send data to a server
    setSelectedTeam(null); // Close the form after submission
  };

  const handleImageError = (teamName) => {
    setImageErrors(prev => ({
      ...prev,
      [teamName]: true
    }));
  };
  const closeModal = () => {
    setSelectedTeam(null); // Close the modal
  };

  return (
    <div>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
        {teams.map((team) => (
          <div key={team.name} className="relative overflow-hidden rounded-large">
            <Card
              isPressable
              onPress={() => handleTeamClick(team)} // Handle click event
              className="max-w-[300px] transform transition-transform duration-200 hover:scale-[0.98]"
            >
              <CardBody className="p-0">
                {!imageErrors[team.name] ? (
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={team.name}
                    className="w-full h-[200px] object-contain p-2"
                    src={`/logos/${formatTeamNameToLogo(team.name)}-logo.png`}
                    onError={() => handleImageError(team.name)}
                  />
                ) : (
                  <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">{team.name}</span>
                  </div>
                )}
                <div className="p-3">
                  <h2 className="text-lg font-semibold text-center">{team.name}</h2>
                </div>
              </CardBody>
              <CardFooter className="text-small px-3 py-2 flex-col items-start">
                <p className="text-default-500 text-sm line-clamp-2">{team.description}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal for Join Roster Form */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            // Check if the click is on the overlay (outside of modal content)
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="bg-white p-6 rounded-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            <JoinRosterForm onSubmit={handleFormSubmit} teamName={selectedTeam.name} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamList;