import { useParams } from 'react-router-dom';
//import { useAuth } from '../Hooks/useAuth';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button/index';
import { RoomCode } from '../components/Room-code/index';
import { Question } from '../components/Question/index';

import { useRoom } from '../Hooks/useRoom';

import '../styles/rooms.scss';
import '../components/Question/styles.scss';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
//  const { user } = useAuth();
  const params = useParams<RoomParams>();

  
  const roomId = params.id;
  const { tittle, questions } =useRoom(roomId)


  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
           <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
           </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {tittle}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              /> 
            )
          })}
        </div>
      </main>
    </div>
  );
}