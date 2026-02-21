import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/Outputpanel";
import CodeEditorPanel from "../components/CodeEditiorPanel";
function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript,
  );

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectLanguage]);

      setOutput(null);
    }
  }, [id, selectLanguage]);

  const handleLanguageChange = (e) => {};
    const handleProblemChange = () => {};

    const triggerConfetti = () => {};

    const checkIfTestsPassed = () => {};

    const handleRunCode = () => {};
  
  return (
    <div className="h-screen w-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* Left panel-problem desc */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
            problem={currentProblem}
            currentProblemId={currentProblemId}
            onProblemChange={handleProblemChange}
            allProblems={Object.values(PROBLEMS)}
            
            />

          </Panel>
          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
          {/* right panel- code editior*/}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/*Top panel-- code Editior */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel />
              </Panel>


          <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />



{/* Bottom Panel -code Output panel */}

              <Panel defaultSize={30} minSize={30}>
                <OutputPanel />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
