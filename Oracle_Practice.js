var c_index = 0;
var q_index = 0;
var q_list = [];

function Question(content, explain = ""){
    this.content = content;
    this.explain = explain;
    this.choice = [];
    this.answer = 0;
    this.order = Math.random();
};

function Choice(content, answer){
    this.content = content;
    this.answer = answer;
    this.order = Math.random();
};

Question.prototype.setChoice = function(choice, answer){
    this.choice.push(new Choice(choice, answer));
};

Question.prototype.setAnswer = function(answer){
    this.answer = answer;
};

function nextScene(){
    if(q_index >= q_list.length){
        alert('すべての問題が終了しました。\n再度テストを行う場合は、ブラウザを再読み込みしてください。');
        return;
    }
    if(c_index == 0){
	    document.getElementById('pos').textContent = (q_index + 1) + '/' + q_list.length + ' 問';
        showQuestion();
    } else {
        if(c_index >= q_list[q_index].choice.length){
            showAnswer();
        } else {
            pushAnswer();
        }
    }
};

function showQuestion(){
    scene = 'answer';
    document.getElementById('question').value = q_list[q_index].content;
    for(var i = 0; i < 8; i ++){
        document.getElementById('answer_' + i).value = '';
        document.getElementById('answer_' + i).style.background = '#ffffff';
    }
    document.getElementById('answer_0').value = q_list[q_index].choice[0].content;
    document.getElementById('explain').textContent = '';
    c_index = 1;
};

function pushAnswer(){
    document.getElementById('answer_' + c_index).value = q_list[q_index].choice[c_index].content;
    c_index ++;
};

function showAnswer(){
    scene = 'question';
    for(var i = 0; i < 8; i ++){
        if(i < q_list[q_index].choice.length){
            if(q_list[q_index].choice[i].answer){
                document.getElementById('answer_' + i).style.background = '#ccffcc';
            } else {
                document.getElementById('answer_' + i).style.background = '#ffcccc';
            }
            textContent = '・' + q_list[q_index].choice[i].content;
        }
    }
    document.getElementById('explain').textContent = q_list[q_index].explain;
    c_index = 0;
    q_index ++;
};

function pushChoice(choice, answer){
    q_list[q_list.length - 1].setChoice(choice, answer);
};

function sortChoice(){
    q_list[q_list.length - 1].choice.sort(function(a, b){
        return a.order - b.order;
    });
};

function sortQuestion(){
    q_list.sort(function(a, b){
        return a.order - b.order;
    });
};

//問題作成
(function(){
	//=============================================================================
	// 1
	//=============================================================================
	q_list.push(new Question('しきい値、メトリック、サーバー生成アラートについて正しい説明を3つ選択しなさい。',
	''));
	pushChoice('すべてのメトリックはインスタンスに関連付けられている。', false);
	pushChoice('クリアされたステートフルアラートは、DBA_ALERT_HISTORYコマンドを実行することで表示されます。', true);
	pushChoice('空き領域のアラートは、根本的な問題が解決されると自動的にクリアされます。', true);
	pushChoice('テーブルスペースが97％満たされると、SMONによって生成されます。', false);
	pushChoice('メトリックは、特定のユニットの統計カウントです。', true);
	pushChoice('アラートを生成するには、STATISTICS_LEVELをALLに設定する必要があります。', false);
	sortChoice();
	
	//=============================================================================
	// 2
	//=============================================================================
	q_list.push(new Question('SBTチャネルへのバックアップ中に、圧縮されたRMAN増分レベル0バックアップの読み取りフェーズがボトルネックであると判断しました。'
	+ '\nデータベースでFORCE LOGGINGが有効になっています。'
	+ '\n読み取りパフォーマンスを改善できるものとして正しい説明を2つ選択しなさい。',
	''));
	pushChoice('テープI/Oバッファーのサイズを増やします。', false);
	pushChoice('データベースのFORCE LOGGINGを無効にします。', false);
	pushChoice('データベースバッファキャッシュのサイズを増やします。', false);
	pushChoice('非同期ディスクI/Oを有効にします。', true);
	pushChoice('RMAN多重化のレベルを上げます。', true);
	sortChoice();

	//=============================================================================
	// 3
	//=============================================================================
	q_list.push(new Question('CREATE PLUGGABLE DATABASEコマンドでUSER_TABLESPACE句を使用する要件として正しい説明を2つ選択しなさい。',
	''));
	pushChoice('同じCDB内の別のPDBから複製されたPDB内のデフォルト表領域を指定します。', false);
	pushChoice('PDBに接続するときに、SYSTEM、SYSAUX、TEMP以外のすべての表領域を除外します。', true);
	pushChoice('PDBの再配置時にのみ特定のユーザー表領域を含めます。', false);
	pushChoice('非CDBをPDBに移動するときに含めるユーザー表領域のリストを指定します。', true);
	pushChoice('PDBに接続するときに一時表領域を除外します。', false);
	pushChoice('CDBシードからPDBを作成するときに含める表領域のリストを指定します。', false);
	sortChoice();
}());

(function(){
    sortQuestion();
	console.log(q_list);	
}());
