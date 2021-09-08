import { useHistory, useParams } from 'react-router-dom';
//import { useAuth } from '../Hooks/useAuth';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button/index';
import { RoomCode } from '../components/Room-code/index';
import { Question } from '../components/Question/index';
import { database } from '../services/firebase';
import { useRoom } from '../Hooks/useRoom';

import '../styles/rooms.scss';
import '../components/Question/styles.scss';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
//  const { user } = useAuth();
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { tittle, questions } =useRoom(roomId)

  async function handleEndRoom (){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }
  
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
       isHighLighted: true,
    });
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }


  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
           <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar a pergunta como respondida" />
                    </button>
                
                    <button
                      type="button"
                      onClick={() => handleHighLightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover a pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}