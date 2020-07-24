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
	'データベース・パフォーマンスの監視と調整'
	+ '\n★★★★☆'));
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
	
	//=============================================================================
	// 4
	//=============================================================================
	q_list.push(new Question('さまざまなFLASHBACK操作の要件について正しい説明を3つ選択しなさい。',
	''));
	pushChoice('FLASHBACKトランザクションコマンドでは、2つの時点の間に存在していた行のすべてのバージョンを取得するために、UNDO情報が必要です。', true);
	pushChoice('FLASHBACKドロップでは、RECYCLEBINパラメータをONに設定する必要があります。', true);
	pushChoice('FLASHBACKバージョンコマンドでは、RECYCLEBINパラメータをONに設定する必要があります。', false);
	pushChoice('FLASHBACK DATA ARCHIVEは、追跡されているテーブルのすべての行のすべてのバージョンを保存するために、UNDO情報が必要です。', false);
	pushChoice('FLASHBACKドロップでは、2つの時点の間に存在していた行のすべてのバージョンを取得するために、UNDO情報が必要です。', false);
	pushChoice('FLASHBACKバージョンクエリでは、2つの時点の間に存在していた行のすべてのバージョンを取得するために、UNDO情報が必要です。', true);
	sortChoice();
	
	//=============================================================================
	// 5
	//=============================================================================
	q_list.push(new Question('Oracle Grid Infrastructure用のOracle Preinstallaiont RPM oracle-database-server-xxxx-preinstallによって実行される3つのアクションはどれですか。',
	''));
	pushChoice('Oracle Grid Infrastructureの最小構成要件が満たされていることを確認するためのチェックの実行。', false);
	pushChoice('Oracle OSユーザーの作成。', true);
	pushChoice('OSDBA（dba）グループの作成。', true);
	pushChoice('oraInventory（oinstall）グループの作成。', true);
	pushChoice('Grid OSユーザーの作成。', false);
	pushChoice('Oracle自動ストレージ管理共有ストレージ・アクセス用のOSの構成。', false);
	sortChoice();
	
	//=============================================================================
	// 6
	//=============================================================================
	q_list.push(new Question('共有オブジェクトについて正しい説明を2つ選択しなさい。',
	''));
	pushChoice('CDB$ROOTでのみ作成できます。', false);
	pushChoice('これらは、アプリケーションコンテナ内でのみメタデータにリンクできます。', false);
	pushChoice('これらは、アプリケーションコンテナ内のユーザー定義スキーマにのみ存在できます。', false);
	pushChoice('これらは、CDB$ROOTおよびアプリケーションルートに存在できます。', true);
	pushChoice('これらは、CDB$ROOTで拡張データリンクできます。', false);
	pushChoice('これらは、アプリケーションルートでのみ作成できます。', true);
	sortChoice();
	
	//=============================================================================
	// 7
	//=============================================================================
	q_list.push(new Question('自動データベース診断モニター（ADDM）について正しい説明を2つ選択しなさい。',
	''));
	pushChoice('12時間のアクティビティに対応する期間を分析します。', false);
	pushChoice('各AWRスナップショットの後に自動的に実行されます。', true);
	pushChoice('DBAは手動で実行できます。', true);
	pushChoice('結果はアラートログに書き込まれます。', false);
	pushChoice('前日の活動に対応する期間を分析します。', false);
	sortChoice();
	
	//=============================================================================
	// 8
	//=============================================================================
	q_list.push(new Question('サーバー生成アラートについて正しい説明を2つ選択しなさい。',
	''));
	pushChoice('問題を解決した後、DBAがステートフルアラートを作成する必要があります。', false);
	pushChoice('ステートレスアラートは、アラート履歴から手動で削除できます。', true);
	pushChoice('ステートレスアラートは手動でクリアできます。', true);
	pushChoice('ステートレスアラートは自動的にクリアされます。', false);
	pushChoice('ステートフルアラートは、アラート履歴から自動的に削除されます。', false);
	sortChoice();
	
	//=============================================================================
	// 9
	//=============================================================================
	q_list.push(new Question('環境変数を使用して配置されているものとして正しい説明を3つ選択しなさい。',
	''));
	pushChoice('Oracleソフトウェアおよび構成ファイルを格納するためのOptimal Flexible Architecture（OFA）準拠のパス。', true);
	pushChoice('Oracle Net Services構成ファイルの場所。', true);
	pushChoice('起動時にOracle自動ストレージ管理（ASM）インスタンスによってマウントされるディスク・グループ名のリスト。', false);
	pushChoice('一時テーブルスペースで使用される一時ファイルのデフォルトディレクトリ。', false);
	pushChoice('インストール中にOracle Installerによって使用される一時ディスク領域。', true);
	pushChoice('データベースインスタンスで開くことができるデータベースファイルの最大数。', false);
	sortChoice();

	//=============================================================================
	// 10
	//=============================================================================
	q_list.push(new Question('OPatchAutoについて正しい説明を3つ選択しなさい。',
	'答えは3つ'));
	pushChoice('パッチ適用プロセス中に、Oracle Grid InfrastructureとOracle Databaseホームの両方のすべてのプロセスのシャットダウンおよび再起動が実行されます。', true);
	pushChoice('rootユーザー権限を持つユーザーが呼び出す必要があります。', true);
	pushChoice('パッチはopatchautoを介して適用されます。', true);
	pushChoice('ユーザーは常にパッチプランをopatchautoに入力する必要があります。', false);
	pushChoice('Oracle Grid InfrastructureおよびOracle Databaseインスタンスを起動する前に停止する必要があります。', false);
	pushChoice('デフォルトでは、非ローリングモードでパッチを適用します。', false);
	pushChoice('これは、Oracle Grid InfrastructureとOracle Databaseホームの組合せに個別パッチを適用するために使用されます。', true);
	sortChoice();
	
	//=============================================================================
	// 11
	//=============================================================================
	q_list.push(new Question('Oracleデータベースで使用される文字セットについて正しい説明を2つ選択しなさい。',
	''));
	pushChoice('シングルバイト文字セットは、マルチバイト文字セットよりも優れたパフォーマンスを提供します。', true);
	pushChoice('Unicodeでは、任意の言語の情報を単一の文字セットを使用して格納できます。', true);
	pushChoice('Unicodeは、Database Configuration Assistant（DBCA）を使用して作成されたOracleデータベースでサポートされる唯一の文字セットです。', false);
	pushChoice('シングルバイト文字セットは常に7ビットのコード化スキームを使用します。', false);
	pushChoice('マルチバイト文字セットを使用すると、シングルバイト文字セットよりもスペースを効率的に使用できます。', false);
	pushChoice('シングルバイト文字セットは常に8ビットのコード化スキームを使用します。', false);
	sortChoice();
}());

(function(){
    sortQuestion();
	console.log(q_list);	
}());
