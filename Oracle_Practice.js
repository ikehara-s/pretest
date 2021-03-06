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
	'B'));
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
	'B'));
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
	'B'));
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
	'A'));
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
	q_list.push(new Question('Oracle Grid Infrastructure用のOracle Preinstallation RPM oracle-database-server-xxxx-preinstallによって実行される3つのアクションはどれですか。',
	'A'));
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
	q_list.push(new Question('共通オブジェクトについて正しい説明を2つ選択しなさい。',
	'C'));
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
	'A'));
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
	'A'));
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
	'A'));
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
	'C'));
	pushChoice('パッチ適用プロセス中に、Oracle Grid InfrastructureとOracle Databaseホームの両方のすべてのプロセスのシャットダウンおよび再起動が実行されます。', true);
	pushChoice('rootユーザー権限を持つユーザーが呼び出す必要があります。', false);
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
	'A'));
	pushChoice('シングルバイト文字セットは、マルチバイト文字セットよりも優れたパフォーマンスを提供します。', true);
	pushChoice('Unicodeでは、任意の言語の情報を単一の文字セットを使用して格納できます。', true);
	pushChoice('Unicodeは、Database Configuration Assistant（DBCA）を使用して作成されたOracleデータベースでサポートされる唯一の文字セットです。', false);
	pushChoice('シングルバイト文字セットは常に7ビットのコード化スキームを使用します。', false);
	pushChoice('マルチバイト文字セットを使用すると、シングルバイト文字セットよりもスペースを効率的に使用できます。', false);
	pushChoice('シングルバイト文字セットは常に8ビットのコード化スキームを使用します。', false);
	sortChoice();
	
	//=============================================================================
	// 12
	//=============================================================================
	q_list.push(new Question('セッションとサービスのモニタリング待機について正しい説明を3つ選択しなさい。',
	'B'));
	pushChoice('V$SESSION_EVENTは、セッションで少なくとも1回待機が発生した場合、過去および既存のすべてのセッションの待機をすべて表示する。', false);
	pushChoice('V$SERVICE_EVENTは、サービスに対して少なくとも1回待機が発生した場合、すべてのサービスのすべての待機を表示する。', true);
	pushChoice('V$SESSION_WAIT_CLASSは、待機中のセッションについてのみ、待機クラスごとに分類された待機を表示する。', false);
	pushChoice('V$SESSION_WAITとV$SESSIONの両方に、待機していないセッションが最後に待機したイベントの詳細が含まれている。', false);
	pushChoice('V$SESSION_EVENTは、セッションで少なくとも1回待機が発生した場合、過去のすべてのセッションの待機をすべて表示する。', true);
	pushChoice('V$SESSION_WAITとV$SESSIONの両方に、セッションが現在待機しているイベントの詳細が含まれている。', true);
	sortChoice();

	//=============================================================================
	// 13
	//=============================================================================
	q_list.push(new Question('UNIVERSITYテーブルスペースを1つのデータベースから別のデータベースに転送する必要があります。'
	+ '\nUNIVERSITYテーブルスペースは現在読み取り/書き込みで開いています。'
	+ '\nソースと宛先のプラットフォームでは、エンディアン形式が異なります。'
	+ '\nこのアクションのリストを調べます。'
	+ '\n'
	+ '\n1. ソースシステムでUNIVERSITYテーブルスペースを読み取り専用にします。'
	+ '\n2. EXPDPを使用してUNIVERSITYテーブルスペースメタデータをエクスポートします。'
	+ '\n3. ソースシステムでRMANを使用して、UNIVERSITYテーブルスペースデータファイルを宛先プラットフォームフォーマットに変換します。'
	+ '\n4. UNIVERSITYテーブルスペースデータファイルを宛先システムにコピーします。'
	+ '\n5. Data Pumpダンプ・セットを宛先システムにコピーします。'
	+ '\n6. 宛先システムでRMANを使用して、UNIVERSITYテーブルスペースデータファイルを宛先プラットフォーム形式に変換します。'
	+ '\n7. IMPDPを使用してUNIVERSITYテーブルスペースメタデータをインポートします。'
	+ '\n8. 宛先システムでUNIVERSITYテーブルスペースを読み取り/書き込み可能にします。'
	+ '\n'
	+ '\nUNIVERSITYテーブルスペースをトランスポートするために必要なアクションの最小数は、正しい順序でどれですか。',
	'A'));
	pushChoice('1, 2, 4, 5, 7, 8', false);
	pushChoice('1, 2, 4, 6, 7, 8', false);
	pushChoice('1, 2, 3, 4, 5, 7, 8', true);
	pushChoice('1, 2, 3, 4, 5, 6, 7, 8', false);
	pushChoice('2, 4, 5, 6, 7', false);
	sortChoice();

	//=============================================================================
	// 14
	//=============================================================================
	q_list.push(new Question('Oracle Grid InfrastructureとOracle Relational Database Management System（RDBMS）のOSグループとユーザーについて正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('デフォルトでは、OSASMグループのメンバーは自動ストレージ管理およびRDBMSインスタンスにアクセスできます。', false);
	pushChoice('Oracle Grid InfrastructureおよびOracle Databaseの所有者のプライマリ・グループは、Oracle Inventoryグループである必要があります。', true);
	pushChoice('Oracle Grid Infrastructureインストールは、グリッド・ユーザーが所有する必要があります。', false);
	pushChoice('Oracle Grid Infrastructureの所有者は、Oracle RestartおよびOracle自動ストレージ管理バイナリを所有しています。', true);
	pushChoice('Oracle Grid Infrastructureの所有者は、セカンダリグループとしてOSOPER、OSBACKUPDBA、およびOSKMDBAを持っている必要があります。', false);
	pushChoice('自動ストレージ管理とOracleデータベースには同じOSDBAグループを使用する必要があります。', false);
	sortChoice();

	//=============================================================================
	// 15
	//=============================================================================
	q_list.push(new Question('Recovery Manager（RMAN）を使用したデータベースの複製について正しい説明を4つ選択しなさい。',
	'A'));
	pushChoice('複製は、補助データベースインスタンスがターゲットデータベースインスタンスからバックアップセットをプルすることで実行できます。', true);
	pushChoice('補助インスタンスへの接続は常に必要です。', true);
	pushChoice('ターゲットデータベースのサブセットを複製できます。', true);
	pushChoice('複製されたデータベースには、常に新しいDBIDが作成されます。', false);
	pushChoice('リカバリカタログインスタンスへの接続は常に必要です。', false);
	pushChoice('ターゲットデータベースのバックアップは常に必要です。', false);
	pushChoice('複製は、ターゲットデータベースインスタンスがコピーを補助データベースインスタンスにプッシュさせることで実行できます。', true);
	pushChoice('ターゲットデータベースインスタンスへの接続は常に必要です。', false);
	sortChoice();

	//=============================================================================
	// 16
	//=============================================================================
	q_list.push(new Question('CDB1と呼ばれるコンテナーデータベースはOMF対応です。'
	+ '\nPDB_FILE_NAME_CONVERTパラメータはCDB1で構成されていません。'
	+ '\nPDB1は、週の初めにCDB1から切り離されました。'
	+ '\nCDB1で実行されるこのコマンドを調べます。'
	+ '\n'
	+ '\nSQL> CREATE PLUGGABLE DATABASE pdb1 USING "/u01/app/oracle/oradata/pdb1.xml"'
	+ '\n  2  SOURCE_FILE_NAME_CONVERT = ("/u01/app/oracle/oradata/", "/u02/app/oracle/oradata/");'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('PDB1データファイルはすでに正しい場所に存在しています。', false);
	pushChoice('コマンドを実行する前に、DBMS_PDB.CHECK_PLUG_COMPATIBILITYをCDB1で実行する必要があります。', false);
	pushChoice('コマンドを実行する前に、PDB_FILE_NAME_CONVERTを設定する必要があります。', false);
	pushChoice('"/u01/app/oracle/oradata/pdb1.xml"には、PDB1のデータファイルの現在の場所が含まれていません。', true);
	pushChoice('PDB1はCDB1から削除する必要があります。', true);
	sortChoice();

	//=============================================================================
	// 17
	//=============================================================================
	q_list.push(new Question('Recovery Manager（RMAN）のイメージコピーを使用してプラットフォーム間でデータベースを転送することについて正しい説明を3つ選択しなさい。',
	'B (「データベースは、エンディアン形式が異なるシステム間で転送できます。」も正しそう)'));
	pushChoice('デフォルトでは、転送されたデータベースはOracle Managed Files（OMF）を使用します。', true);
	pushChoice('データファイルは宛先システムで変換できます。', true);
	pushChoice('データファイルはソースシステムで変換できます。', true);
	pushChoice('転送されたデータベース用に新しいDBIDが自動的に作成されます。', false);
	pushChoice('データベースは、エンディアン形式が異なるシステム間で転送できます。', false);
	pushChoice('パスワードファイルはRMANによって自動的に変換されます。', false);
	sortChoice();

	//=============================================================================
	// 18
	//=============================================================================
	q_list.push(new Question('このコマンドについて調べます。'
	+ '\n'
	+ '\n$ rhpctl move database -sourcehome Oracle_home_path -destinationhome Oracle_home_path'
	+ '\n'
	+ '\nこのコマンドを使用する目的として正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('既存のOracle Databaseホームを同じサーバー上のOracleソフトウェアの新しいリリースに切り替える。', false);
	pushChoice('読み取り専用のOracleホームに切り替える。', false);
	pushChoice('ロールバック操作の一部として前のOracleホームに戻る。', true);
	pushChoice('集中型Rapid Home Provisioningサーバーを使用しているときにOracle Databaseホームを切り替える。', false);
	pushChoice('パッチが適用されたOracle Databaseホームに切り替える。', true);
	sortChoice();

	//=============================================================================
	// 19
	//=============================================================================
	q_list.push(new Question('CDBでLOCAL_UNDO_ENABLEDプロパティをfalseに変更することについて正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('変更後、必要な権限を持つ共通ユーザーのみが、CDB＆ROOTにUNDO表領域を作成できます。', true);
	pushChoice('新しいPDBと既存のPDBは、CDB$ROOTのデフォルトのUNDO表領域を使用するように自動的に構成されます。', true);
	pushChoice('変更後、CDB$ROOTに存在できるUNDO表領域は1つだけです。', false);
	pushChoice('変更後、必要な権限を持つすべてのユーザーがPDBにUNDO表領域を作成できます。', false);
	pushChoice('PDBに存在するUNDO表領域は、変更前に削除する必要があります。', false);
	pushChoice('変更後、新しいUNDOモードを有効にするには、既存の各PDBを再度開く必要があります。', false);
	sortChoice();

	//=============================================================================
	// 20
	//=============================================================================
	q_list.push(new Question('SQL Performance Analyzerについて正しい説明を2つ選択しなさい。',
	'C'));
	pushChoice('SQL Access Advisorと統合されています。', false);
	pushChoice('SQLワークロードの応答時間に対するシステム変更の影響を予測します。', true);
	pushChoice('分析タスクの各SQLステートメントの実行前後の統計を提供します。', true);
	pushChoice('分析タスク内のすべてのSQLステートメントをグループとして詳細に分析できます。', false);
	pushChoice('最初に同時に実行されたSQLステートメントは、SPAによって同時に実行されます。', false);
	sortChoice();

	//=============================================================================
	// 21
	//=============================================================================
	q_list.push(new Question('ユーザーがデータベースのパフォーマンスの低下について不満を言っています。'
	+ '\nユーザーのセッションが特定のタイプのI/Oアクティビティを待機しているかどうかを確認したいとします。'
	+ '\nセッションで少なくとも1回待機したすべての待機を表示するビューはどれですか？',
	'A'));
	pushChoice('V$SESSION_EVENT', true);
	pushChoice('V$SESSTAT', false);
	pushChoice('V$SESSION_WAIT', false);
	pushChoice('V$SESSION_WAIT_CLASS', false);
	pushChoice('V$SESSION', false);
	sortChoice();

	//=============================================================================
	// 22
	//=============================================================================
	q_list.push(new Question('オプティマイザ統計の収集に関して正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('CDB$ROOTに接続しているときにDBMS_STATS.GATHER_DATABASE_STATSを実行すると、PDB$SEEDを除くすべての開いているPDBのオブジェクト統計が収集されます。', false);
	pushChoice('読み取り/書き込みモードで開かれたPDBに接続されている間にDBMS_STATS.GATHER_DATABASE_STATSを実行すると、そのPDBのオブジェクト統計が収集されます。', true);
	pushChoice('CDB$ROOTに接続している間にDBMS_STATS.GATHER_DATABASE_STATSを実行すると、CDB$ROOT内のオブジェクト統計のみが収集されます。', true);
	pushChoice('システム統計は、CDB$ROOTに接続している間のみ収集できます。', false);
	pushChoice('CDB$ROOTに接続しているときにDBMS_STATS.GATHER_DATABASE_STATSを実行すると、開いているすべてのプラガブルデータベース（PDB）のオブジェクト統計が収集されます。', false);
	sortChoice();
	
	//=============================================================================
	// 23
	//=============================================================================
	q_list.push(new Question('このコマンドについて調べます。'
	+ '\n'
	+ '\nSQL> select pluggable_database, shares, parallel_server_limit'
	+ '\n  2  from dba_cdb_rsrc_plan_directives where plan = "MY_PLAN"'
	+ '\n  3  order by pluggable_database;'
	+ '\n'
	+ '\nPLUGGABLE_DATABASE         SHARES    PARALLEL_SERVER_LIMIT'
	+ '\n-------------------------- --------- -------------------------'
	+ '\nORA$AUTOTASK                                              100'
	+ '\nORA$DEFAULT_PDB_DIRECTIVE         1                         0'
	+ '\nPDB1                              2                       100'
	+ '\nPDB2                              2                        25'
	+ '\nPDB3                              1'
	+ '\n'
	+ '\nSQL> select name, value from v$parameter'
	+ '\n  2  where name = "resource_manager_plan";'
	+ '\n'
	+ '\nNAME                   VALUE'
	+ '\n---------------------- --------'
	+ '\nresource_manager_plan  MY_PLAN'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('プランで指定されていないPDBは、ステートメントを並行して実行できません。', false);
	pushChoice('PDB3は、利用可能なすべての並列実行プロセスを時に使用できます。', true);
	pushChoice('PDB1は、需要に関係なく、常に利用可能なシステムリソースの40％に制限されています。', false);
	pushChoice('プランで指定されていないPDBは、使用可能なシステムリソースの最大16.5％を使用できます。', false);
	pushChoice('PDB3は、十分な需要がある場合、利用可能なシステムリソースの少なくとも20％を受け取ることが保証されています。', true);
	pushChoice('PDB2は、十分な需要がある場合、使用可能な並列実行プロセスの少なくとも25％が保証されています。', false);
	sortChoice();
	
	//=============================================================================
	// 24
	//=============================================================================
	q_list.push(new Question('Oracle Database 19c以降のオペレーティングシステムスクリプトの実行について正しい説明を2つ選択しなさい。',
	'C'));
	pushChoice('orainstRoot.shは、sudoまたはroot資格情報を使用して、データベースインストーラーによって自動的に実行できます。', true);
	pushChoice('root.shは、root資格情報が提供されている場合にのみ、データベースインストーラーによって自動的に実行できます。', false);
	pushChoice('sudoパスワードは、レスポンスファイルで指定できます。', false);
	pushChoice('root.shは、sudo資格情報を使用することによってのみ、データベースインストーラーによって自動的に実行できます。', false);
	pushChoice('sudoパスワードは、レスポンスファイルで指定する必要があります。', false);
	pushChoice('rootパスワードをレスポンスファイルで指定することはできません。', true);
	sortChoice();
	
	//=============================================================================
	// 25
	//=============================================================================
	q_list.push(new Question('自動共有メモリ管理は、データベースインスタンスの1つに対して無効になっています。'
	+ '\n一部のSQLステートメントは、過度のハード解析アクティビティが原因でパフォーマンスが低下し、パフォーマンスが低下します。'
	+ '\n次のすべき行動として正しいものを選択しなさい。',
	'A'));
	pushChoice('SQLアクセスアドバイザを実行します。', false);
	pushChoice('共有プールのメモリアドバイザを実行します。', true);
	pushChoice('SQLチューニングアドバイザを実行します。', false);
	pushChoice('PGAのメモリアドバイザーを実行します。', false);
	pushChoice('SGAのメモリアドバイザーを実行します。', false);
	sortChoice();
	
	//=============================================================================
	// 26
	//=============================================================================
	q_list.push(new Question('Oracle Database 19c以降のリリースのフラッシュバック機能について正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('フラッシュバックログは、DB_FLASHBACK_RETENTION_TARGETがすでに保持されている時間よりも低く設定されると、自動的にパージされます。', true);
	pushChoice('フラッシュバックログは監視され、DB_FLASHBACK_RETENTION_TARGETで定義された保持期間を過ぎると、領域の圧迫があった場合にのみ、事前に削除されます。', false);
	pushChoice('フラッシュバックログは監視され、DB_FLASHBACK_RETENTION_TARGETで定義された保存期間を過ぎると、領域の圧迫が発生する前に事前に削除されます。', true);
	pushChoice('フラッシュバックログは、DB_FLASHBACK_RETENTION_TARGETで定義された保持期間よりも古いものとして監視され、管理者が作成したイベントトリガーによって削除できます。', false);
	pushChoice('フラッシュバックログは、DB_FLASHBACK_RETENTION_TARGETの値が変更されるたびに自動的にパージされます。', false);
	sortChoice();
	
	//=============================================================================
	// 27
	//=============================================================================
	q_list.push(new Question('これらのクエリとその出力を調べます。'
	+ '\n'
	+ '\nSQL> select log_mode from v$database;'
	+ '\n'
	+ '\nLOG_MODE'
	+ '\n-----------'
	+ '\nARCHIVELOG'
	+ '\n'
	+ '\nSQL> select property_name, property_value'
	+ '\n  2  from database_properties where property_name like "%UNDO%";'
	+ '\n'
	+ '\nPROPERTY_NAME       PROPERTY_NAME'
	+ '\n------------------- --------------'
	+ '\nLOCAL_UNDO_ENABLED  FALSE'
	+ '\n'
	+ '\nSQL> select p.name, f.file#, t.name'
	+ '\n  2  from v$containers p, v$datafile f, v$tablespace t'
	+ '\n  3  where p.con_if=f.con_id'
	+ '\n  4  and p.con_id=t.con_id'
	+ '\n  5  and t.ts#=f.ts#'
	+ '\n  6  order by 1, 2;'
	+ '\n'
	+ '\nNAME      FILE#   NAME'
	+ '\n--------- ------- -------------'
	+ '\nCDB$ROOT       1  SYSTEM'
	+ '\n...'
	+ '\nPDB1          24  SYSTEM'
	+ '\n...'
	+ '\nPDB2          16  SYSTEM'
	+ '\n'
	+ '\nシステムがクラッシュした後、インスタンスが再起動し、PDBを開こうとした結果、次のようになりました。'
	+ '\n'
	+ '\nSQL> startup quiet'
	+ '\nORACLE instance started.'
	+ '\nDatabase mounted.'
	+ '\nDatabase opened.'
	+ '\nSQL> alter pluggable database all open;'
	+ '\nalter pluggable database all open;'
	+ '\n*'
	+ '\nERROR at line 1:'
	+ '\nORA-01157: cannot identify/lock data file 24 - see DBWR trace file'
	+ '\nORA-01110: data file 24:'
	+ '\n"/u01/oradata/V122CDB1/516000726D464D04E054000C29704164/datafile/o1_mf_system_dmj30kld_.dbf"'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('データファイル24は、PDB2が開いている間に回復できます。', true);
	pushChoice('データファイル24は、CDBが開いている間に回復する必要があります。', false);
	pushChoice('データファイル24は、CDB$ROOTおよびPDB$SEEDが開いている間に回復できます。', true);
	pushChoice('CDBが開いている間は、データファイル24を復元できません。', false);
	pushChoice('データファイル24は、PDB2が閉じている間に回復する必要があります。', false);
	sortChoice();
	
	//=============================================================================
	// 28
	//=============================================================================
	q_list.push(new Question('RMANの二重化バックアップセットについて正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('二重化されたバックアップセットは、同じ数のファイルに対して、二重化されていないバックアップセットと同じ数のSBTチャネルを使用します。', false);
	pushChoice('ディスクに書き込まれた非二重化バックアップセットは、すでにディスク上にあるバックアップセットをバックアップすることにより、ディスクに二重化できます。', true);
	pushChoice('SBTに書き込まれた二重化されていないバックアップセットは、すでにテープ上にあるバックアップセットをバックアップすることにより、テープに二重化できます。', false);
	pushChoice('ディスクに書き込まれた非二重化バックアップセットは、すでにディスク上にあるバックアップセットをバックアップすることにより、テープに二重化できます。', true);
	pushChoice('SBTに書き込まれた非二重化バックアップセットは、すでにテープ上にあるバックアップセットをバックアップすることにより、ディスクに二重化できます。', false);
	pushChoice('二重化されたバックアップセットは、同じ数のファイルに対して、常に二重化されていないバックアップセットの2倍のSBTチャネルを使用します。', false);
	sortChoice();
	
	//=============================================================================
	// 29
	//=============================================================================
	q_list.push(new Question('RMANの永続的な構成設定、管理、およびそれらの影響について正しい説明を3つ選択しなさい。',
	'B'));
	pushChoice('ターゲットデータベースの永続的なRMAN構成設定は常にターゲットの制御ファイルに格納されます。', true);
	pushChoice('バックアップ場所に十分なスペースがない場合、リカバリ期間の保存ポリシーより古いバックアップは常に自動的に削除されます。', false);
	pushChoice('冗長性保持ポリシーに基づいたobosleteである高速リカバリ領域（FRA）に書き込まれたバックアップは、自動的に削除してスペースを解放できます。', true);
	pushChoice('RMAN SHOW ALLコマンドは、デフォルト値以外の設定のみを表示します。', false);
	pushChoice('ターゲットデータベースの永続的なRMAN構成設定は、常にRMANカタログと自動的に同期されます。', false);
	pushChoice('V$RMAN_CONFIGURATIONビューには、値が変更された設定のみが表示されます。', true);
	pushChoice('DBAは、冗長性保持ポリシーまたはリカバリウィンドウ保持ポリシーを指定する必要があります。', false);
	sortChoice();
	
	//=============================================================================
	// 30
	//=============================================================================
	q_list.push(new Question('オプティマイザ統計アドバイザーについて正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('手動でのみ実行できます。', false);
	pushChoice('これは、DBMS_ADVISORパッケージの一部です。', false);
	pushChoice('統計収集プロセスを改善するために変更を推奨できます。', true);
	pushChoice('常にデータベース内のすべてのスキーマを分析します。', false);
	pushChoice('デフォルトでは毎晩自動的に実行されます。', true);
	pushChoice('これは、DBMS_STATSパッケージの一部です。', true);
	sortChoice();
	
	//=============================================================================
	// 31
	//=============================================================================
	q_list.push(new Question('このコマンドについて調べます。'
	+ '\n'
	+ '\nRMAN> BACKUP RECOVERY FILES;'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('現在のFRAに含まれておらず、まだバックアップされていないすべてのOracleリカバリファイルがバックアップされます。', true);
	pushChoice('まだバックアップされていない、現在のFRA内のすべてのOracle以外のファイルがバックアップされます。', false);
	pushChoice('まだバックアップされていない、現在のFRA内のすべてのOracleリカバリファイルがバックアップされます。', true);
	pushChoice('現在の高速リカバリ領域（FRA）内のすべてのOracleリカバリファイルがバックアップされます。', false);
	pushChoice('これらのバックアップは、ディスクまたはSBTに書き込むことができます。', false);
	sortChoice();
	
	//=============================================================================
	// 32
	//=============================================================================
	q_list.push(new Question('Oracle database方法論について正しい説明を2つ選択しなさい。',
	'C'));
	pushChoice('Oracle Databaseの時間モデルを使用して、チューニングが最も必要なデータベースとインスタンスの領域を見つける必要があります。', true);
	pushChoice('ユーザーがパフォーマンスに満足したら、チューニングアクティビティを停止する必要があります。', true);
	pushChoice('パフォーマンスに関する合意されたサービスレベルに達したら、チューニングアクティビティを停止する必要があります。', false);
	pushChoice('ファイルシステムを調整する前に、データベースインスタンスのメモリを常に調整する必要があります。', false);
	pushChoice('ファイルシステムを調整する前に、SQLステートメントを常に調整する必要があります。', false);
	pushChoice('アラートログは、チューニングが最も必要なデータベースとインスタンスの領域を見つけるために使用する必要があります。', false);
	sortChoice();
	
	//=============================================================================
	// 33
	//=============================================================================
	q_list.push(new Question('Oracle Fast Recovery Area（FRA）にバックアップしているときに、バックアップに時間がかかりすぎてパフォーマンスのボトルネックが疑われます。'
	+ '\nこれらの問題の診断と調整について正しい説明を3つ選択しなさい。',
	'C'));
	pushChoice('RMAN BACKUP VALIDATEコマンドに実際のバックアップとほぼ同じ時間がかかる場合は、読み取りと書き込みの両方のI/Oがボトルネックになっている可能性があります。', false);
	pushChoice('DBWR_IO_SLAVESをゼロ以外の値に設定すると、同期I/Oを使用するときのバックアップパフォーマンスが向上します。', true);
	pushChoice('RMAN BACKUP VALIDATEコマンドの実行時間が実際のバックアップよりも著しく少ない場合は、書き込みI/Oがボトルネックになっている可能性があります。', true);
	pushChoice('RMAN BACKUP VALIDATEコマンドに実際のバックアップとほぼ同じ時間がかかる場合は、読み取りI/Oがボトルネックになっている可能性があります。', true);
	pushChoice('V$BACKUP_SYNC_IO.DISCRETE_BYTES_PER_SECONDの値が高いデータファイルは、同期I/Oを使用するときにパフォーマンスのボトルネックになる可能性があります。', false);
	pushChoice('DBWR_IO_SLAVESをゼロ以外の値に設定すると、非同期I/Oを使用するときのバックアップパフォーマンスが向上します。', false);
	pushChoice('V$BACKUP_ASYNC_IO.SHORT_WAITSの値が高いデータファイルは、非同期I/Oを使用するときにパフォーマンスのボトルネックになる可能性があります。', false);
	sortChoice();
	
	//=============================================================================
	// 34
	//=============================================================================
	q_list.push(new Question('あなたはこの構成を管理しています。'
	+ '\n'
	+ '\n1. CDB1はコンテナーデータベースです。'
	+ '\n2. PDB1とPDB2は、CDB1内のプラガブルデータベースです。'
	+ '\n3. USER1.EMPはPDB1のテーブルで、USER2.DEPTはPDB2のテーブルです。'
	+ '\n'
	+ '\nCDB1ユーザーSYSは、PDB2に正常に接続した後で、次のコマンドを実行しました。'
	+ '\n'
	+ '\nSQL> ALTER SESSION SET CONTAINER=pdb1;'
	+ '\nSession altered.'
	+ '\n'
	+ '\nSQL> INSERT INTO user1.emp VALUES(100, "Alan", 1);'
	+ '\n1 row created.'
	+ '\n'
	+ '\nSQL> INSERT INTO user1.emp VALUES(101, "Ben", 1);'
	+ '\n1 row created.'
	+ '\n'
	+ '\nSQL> ALTER SESSION SET CONTAINER=pdb2;'
	+ '\nSession altered.'
	+ '\n'
	+ '\nSQL> INSERT INTO user2.dept VALUES(1, "IT");'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('セッションがPDB2に接続したとき、USER1.EMPへの挿入はコミットされないままです。', true);
	pushChoice('USER1.EMPへの挿入は、セッションがUSER2.DEPTに行を挿入したときにコミットされました。', false);
	pushChoice('親コンテナー内のアクティブなトランザクションのため、USER2.DEPTへの挿入は失敗します。', true);
	pushChoice('USER2.DEPTの挿入は、子セッションによる再帰的な自律型トランザクションであり、コミットされます。', false);
	pushChoice('USER1.EMPの挿入は、セッションがPDB2に接続したときにロールバックされました。', false);
	pushChoice('USER2.DEPTへの挿入はコミットされていません。', false);
	pushChoice('USER1.EMPへの挿入は、セッションがPDB2に接続したときにコミットされました。', false);
	sortChoice();
	
	//=============================================================================
	// 35
	//=============================================================================
	q_list.push(new Question('この構成を調べます。'
	+ '\n'
	+ '\n1. CDB1は、プラガブルデータベースPDB$SEED、PDB1、およびPDB2を含むOracle Database 12cリリース2データベースです。'
	+ '\n2. PDB$SEEDは読み取りモードでオープンしています。'
	+ '\n3. PDB1は読み取り／書き込みモードでオープンしています。'
	+ '\n4. PDB2はマウント状態です。'
	+ '\n5. ORACLE_HOME環境変数は"/u01/app/oracle/product/18.1.0/dbhome_1"です。'
	+ '\n'
	+ '\nあなたはデータベースを現在のリリースにアップグレードする前に、次のコマンドを実行しました。'
	+ '\n'
	+ '\n$ . oraenv'
	+ '\nORACLE_SID = [cdb1] ? cdb1'
	+ '\n'
	+ '\nORACLE_BASEは/u01/app/oracleで変更されませんでした。'
	+ '\n'
	+ '\n$ $ORACLE_HOME/jdk/bin/java -jar preupgrade.jar TERMINAL TEXT'
	+ '\n'
	+ '\nどのデータベースに対してフィックスアップスクリプトが作成されますか？',
	'A'));
	pushChoice('CDB1、PDB$SEED、PDB1、PDB2', false);
	pushChoice('PDB$SEED、PDB1、PDB2', false);
	pushChoice('CDB1、PDB$SEED', false);
	pushChoice('CDB1、PDB1、PDB2', false);
	pushChoice('CDB1、PDB$SEED、PDB1', true);
	sortChoice();
	
	//=============================================================================
	// 36
	//=============================================================================
	q_list.push(new Question('Oracle Flashback機能について正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('フラッシュバック問い合わせは、REDOレコードをオンラインREDOログファイルおよびアーカイブREDOログファイルから取得できます。', false);
	pushChoice('フラッシュバックバージョン問い合わせは、REDOレコードをオンラインREDOログファイルおよびアーカイブREDOログファイルから取得できます。', false);
	pushChoice('フラッシュバック表は列の削除をフラッシュバックできます。', false);
	pushChoice('フラッシュバックドロップは、テーブルを修復するときにインデックスも修復できます。', true);
	pushChoice('フラッシュバックデータべースを使用してデータベースがフラッシュバックログから復元された後、REDOログを使用してロールフォワードされる場合があります。', true);
	sortChoice();
	
	//=============================================================================
	// 37
	//=============================================================================
	q_list.push(new Question('アプリケーションシードのプラガブルデータベース（PDB）について正しい説明を3つ選択しなさい。',
	'B'));
	pushChoice('アプリケーションがアップグレードされると、アプリケーションルートPDBと自動的に同期されます。', false);
	pushChoice('アプリケーションコンテナが既に作成されている場合は、アプリケーションコンテナに追加できません。', false);
	pushChoice('アプリケーションシードPDBを複製して作成された新しいアプリケーションPDBには、複製の完了後に、古いバージョンのアプリケーションをインストールできます。', true);
	pushChoice('アプリケーションがインストールされると、アプリケーションルートPDBと自動的に同期されます。', false);
	pushChoice('アプリケーションコンテナからドロップすることはできません。', false);
	pushChoice('アプリケーションシードPDBのクローン作成によって作成された新しいアプリケーションPDBには、クローン作成の完了後に、最新バージョンのアプリケーションをインストールできます。', true);
	pushChoice('アプリケーションコンテナでは必要ありません。', true);
	sortChoice();
	
	//=============================================================================
	// 38
	//=============================================================================
	q_list.push(new Question('この構成を調べます。'
	+ '\n'
	+ '\n1. CDB1はコンテナーデータベースです。'
	+ '\n2. PDB1とPDB2は、CDB1内のプラガブルデータベースです。'
	+ '\n3. PDB1とPDB2は読み取り／書き込みモードでオープンしています。'
	+ '\n'
	+ '\n次のコマンドは正常に実行されました。'
	+ '\n'
	+ '\n$ export ORACLE_SID=CDB1'
	+ '\n$ sqlplus / as sysdba'
	+ '\n'
	+ '\nSQL> ALTER SESSION SET CONTAINER = PDB1;'
	+ '\nSession altered.'
	+ '\n'
	+ '\nSQL> SHUTDOWN IMMEDIATE'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('PDB1のコミットされていないトランザクションがロールバックされました。', true);
	pushChoice('PDB1は閉じられます。', true);
	pushChoice('CDB1とPDB1のコミットされていないトランザクションがロールバックされました。', false);
	pushChoice('CDB1はシャットダウンされます。', false);
	pushChoice('CDB1はマウント状態となります。', false);
	sortChoice();
	
	//=============================================================================
	// 39
	//=============================================================================
	q_list.push(new Question('自動ワークロードリポジトリ（AWR）、自動データベース診断モニター（ADDM）、および管理性モニター（MMON）バックグラウンドプロセスについて正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('ADDMは、バッファキャッシュの圧縮を推奨できます。', true);
	pushChoice('ADDMは、バッファキャッシュの拡張を推奨できます。', true);
	pushChoice('デフォルトでは、MMONは30分ごとにAWRスナップショットを作成します。', false);
	pushChoice('ADDMが分析を実行するのは、DBAが要求した場合のみです。', false);
	pushChoice('デフォルトでは、AWRスナップショットは8日後に自動的に消去されます。', true);
	pushChoice('ADDMで不要になったAWRスナップショットを削除する必要があります。', false);
	sortChoice();
	
	//=============================================================================
	// 40
	//=============================================================================
	q_list.push(new Question('コンテナーデータベースCDB2にプラガブルデータベースPDB2を作成するためのコマンドを調べます。'
	+ '\n'
	+ '\nCREATE PLUGGABLE DATABASE pdb2'
	+ '\n    ADMIN USER pdb2_adm'
	+ '\n    IDENTIFIED BY 123pdb'
	+ '\n    ROLES=(CONNECT);'
	+ '\n'
	+ '\n正常に実行されるオプションの説明として正しいものを3つ選択しなさい。',
	'B'));
	pushChoice('FILE_NAME_CONVERT句をステートメントに追加し、PDB_FILE_NAME_CONVERTパラメータを設定します。', false);
	pushChoice('CREATE_FILE_DEST句のみをステートメントに追加します。', true);
	pushChoice('PDB_FILE_NAME_CONVERTパラメータのみを設定します。', true);
	pushChoice('PDB_FILE_NAME_CONVERTパラメータを設定し、OMFを有効にします。', false);
	pushChoice('OMFのみを有効にします。', true);
	pushChoice('FILE_NAME_CONVERT句をステートメントに追加し、Oracle Managed Files（OMF）を有効にします。', false);
	sortChoice();
	
	//=============================================================================
	// 41
	//=============================================================================
	q_list.push(new Question('Recovery Manager（RMAN）診断メッセージ出力について正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('SBTデバイスのメディア管理メッセージは、常にsbtio.logに書き込まれます。', false);
	pushChoice('RMANエラースタックは、エラーが生成される順序なので、下から上に読み取る必要があります。', true);
	pushChoice('RMANエラースタックは、エラーが生成される順序なので、上から下に読み取る必要があります。', false);
	pushChoice('RMAN LOGコマンドライン句を使用すると、RMANコマンドのコンパイル中に発行された出力がログファイルと標準出力に書き込まれます。', true);
	pushChoice('RMAN LOGコマンドライン句を使用すると、RMANコマンドのコンパイル中に発行された出力がログファイルにのみ書き込まれます。', false);
	pushChoice('SBTデバイスのメディア管理メッセージは、Oracleトレースファイルに書き込まれます。', false);
	sortChoice();
	
	//=============================================================================
	// 42
	//=============================================================================
	q_list.push(new Question('Oracleデータベースインスタンスのメモリコンポーネントの管理について正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('自動共有メモリ管理を使用すると、データベースインスタンスは共有プールのサイズを小さくすることにより、ラージプールのサイズを増やすことができます。', true);
	pushChoice('自動メモリ管理を使用すると、データベースインスタンスは、プログラムグローバル領域のサイズを減らすことにより、システムグローバル領域のサイズを増やすことができます。', true);
	pushChoice('自動調整およびサイズ変更されたシステムグローバルエリアコンポーネントは、インスタンスの再起動後、常に初期サイズに戻ります。', false);
	pushChoice('自動メモリ管理は、システムグローバルエリアを物理メモリにロックして使用する必要があります。', false);
	pushChoice('自動共有メモリ管理を使用すると、データベースインスタンスは、システムグローバル領域のサイズを減らすことにより、プログラムグローバル領域のサイズを増やすことができます。', false);
	pushChoice('オンラインのトランザクション処理システムは、多くの場合、意思決定支援システムよりも少ないプログラムグローバル領域を使用します。', true);
	sortChoice();
	
	//=============================================================================
	// 43
	//=============================================================================
	q_list.push(new Question('データベースはARCHIVELOGモードで構成されています。'
	+ '\n完全なRMANバックアップが行われ、制御ファイルのトレース対象のバックアップは行われていません。'
	+ '\nメディア障害が発生しました。'
	+ '\n完全リカバリが可能なシナリオとして正しいものを2つ選択しなさい。',
	'B'));
	pushChoice('最新のバックアップの前または後のアーカイブログが破損している場合。', false);
	pushChoice('制御ファイルのすべてのコピーを失った後。', false);
	pushChoice('最新のバックアップ後のアーカイブログを失った後。', false);
	pushChoice('最新のバックアップ前のアーカイブログを失った後。', true);
	pushChoice('SYSTEMテーブルスペースを失った後。', true);
	sortChoice();
	
	//=============================================================================
	// 44
	//=============================================================================
	q_list.push(new Question('データベースのPoint-in-Timeリカバリについて正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('データベースのPoint-in-Timeリカバリを実行するには、データベースにFLASHBACK DATABASE ONが必要です。', false);
	pushChoice('データベースのPoint-in-Timeリカバリを実行するとき、データベースはMOUNT状態である必要があります。', true);
	pushChoice('データベースのPoint-in-Timeリカバリは、マネージドリカバリプロセス（MRP）によって実行されます。', false);
	pushChoice('データベースはARCHIVELOGモードである必要があります。', true);
	pushChoice('リカバリのターゲットポイントは、stimeまたはシステム変更番号（SCN）として指定する必要があります。', false);
	pushChoice('データベースのPoint-in-Timeリカバリの後、データベースはRESETLOGSで開いている必要があります。', true);
	sortChoice();
	
	//=============================================================================
	// 45
	//=============================================================================
	q_list.push(new Question('SQLチューニングアドバイザについて正しい説明を3つ選択しなさい。',
	'C'));
	pushChoice('分析中の各クエリをチェックして、古くなった統計がないか調べます。', true);
	pushChoice('分析中の各クエリをチェックして、欠落している統計がないか調べます。', true);
	pushChoice('SQL文の構文変更のみを推奨します。', false);
	pushChoice('SQLステートメントに対する意味上の変更を推奨できます。', true);
	pushChoice('アドバイザータスクによって分析されているすべてのSQLステートメントを1つのグループと見なします。', false);
	pushChoice('パフォーマンスが低下しているSQLステートメントごとにSQLプロファイルを作成して、退行を防ぎます。', false);
	sortChoice();
	
	//=============================================================================
	// 46
	//=============================================================================
	q_list.push(new Question('RMANでのプラガブルデータベース（PDBs）の複製について正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('同じRMAN DUPLICATEコマンドを使用して、2つ以上のPDBを複製できます。', true);
	pushChoice('PDBを複製する場合、PDBに属するすべてのテーブルスペースを複製する必要があります。', false);
	pushChoice('補助インスタンスは、ENABLE_PLUGGABLE_DATABASE = TRUEで自動的に作成されます。', false);
	pushChoice('SYSDBAまたはSYSBACKUPを持つユーザーは、RMANでPDBにログインして複製する必要があります。', false);
	pushChoice('CDB$ROOTとPDB$SEEDは自動的に複製されます。', true);
	sortChoice();
	
	//=============================================================================
	// 47
	//=============================================================================
	q_list.push(new Question('Orcale 18c以降に利用可能となったRapid Home Provisioning（RHP）について正しい正しい説明を2つ選択しなさい。',
	'C'));
	pushChoice('Oracle Databaseサービスです。', false);
	pushChoice('Oracle Databaseホームのアップグレードには使用できません。', false);
	pushChoice('アプリケーションのプロビジョニングに使用できます。', true);
	pushChoice('Oracle Restartを含むGrid Infrastructureホームにパッチを適用するために使用できます。', false);
	pushChoice('ミドルウェアのプロビジョニングに使用できます。', true);
	sortChoice();
	
	//=============================================================================
	// 48
	//=============================================================================
	q_list.push(new Question('この構成を調べます。'
	+ '\n'
	+ '\n1. CDB1はコンテナーデータベースです。'
	+ '\n2. 共通ユーザー接頭辞はC##です。'
	+ '\n3. PDB1は、CDB1に含まれているプラガブルデータベースです。'
	+ '\n4. APP1_ROOTは、CDB1に含まれているアプリケーションコンテナーです。'
	+ '\n5. APP1_PDB1は、APP1_ROOTに含まれているアプリケーションPDBです。'
	+ '\n'
	+ '\n次のコマンドは正常に実行されました。'
	+ '\n'
	+ '\n$ sqlplus sys/oracle_4U@localhost:1521/cdb1 as sysdba'
	+ '\n'
	+ '\nSQL> CREATE USER c##user1 identified by oracle_4U container=all;'
	+ '\nUser created.'
	+ '\n'
	+ '\nSQL> ALTER SESSION SET CONTAINER=pdb1;'
	+ '\nSession altered.'
	+ '\n'
	+ '\nSQL> CREATE USER p1_user1 identified by pracle_4U;'
	+ '\nUser Created.'
	+ '\n'
	+ '\nSQL> ALTER SESSION SET CONTAINER=app1_root;'
	+ '\nSession altered.'
	+ '\n'
	+ '\nSQL> ALTER PLUGGABLE DATABASE APPLICATION app1_cdb1_app BEGIN INSTALL "1.0";'
	+ '\nSession altered.'
	+ '\n'
	+ '\nSQL> CREATE USER app1_user1 IDENTIFIED BY oracle_4U;'
	+ '\nUser Created.'
	+ '\n'
	+ '\nSQL> ALTER PLUGGABLE DATABASE APPLICATION app1_cdb1_app end INSTALL "1.0";'
	+ '\nPluggable database altered.'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('APP1_USER1はPDB1に作成できます。', true);
	pushChoice('APP1_USER1はCDB1に作成できます。', false);
	pushChoice('APP1_USER1は、APP1_ROOTに含まれる各アプリケーションPDBで異なる権限を持つことができます。', false);
	pushChoice('C##APP_USER1はCDB1に作成できます。', true);
	pushChoice('P1_USER1はCDB1に作成できます。', false);
	pushChoice('C##USER1は、CDB1のすべてのPDBで同じ特権とロールを付与されます。', false);
	sortChoice();
	
	//=============================================================================
	// 49
	//=============================================================================
	q_list.push(new Question('Oracle Database環境で常に考慮または実装する必要があるパフォーマンス計画のファセットとして正しいものを2つ選択しなさい。',
	'B'));
	pushChoice('すべてのテーブルの主キーを定義して、すべてのクエリを高速化する。', false);
	pushChoice('チェック制約を使用して更新を高速化する。', false);
	pushChoice('結合を高速化するためにすべてのテーブルの外部キーを定義する。', false);
	pushChoice('物理データモデル。', true);
	pushChoice('外部ストレージ構成。', true);
	sortChoice();
	
	//=============================================================================
	// 50
	//=============================================================================
	q_list.push(new Question('Database Upgrade Assistant（DBUA）によって実行される3つのアクションはどれですか？',
	'B'));
	pushChoice('utlrp.sqlを使用して、保存されているすべてのPL / SQLコードを再コンパイルします。', false);
	pushChoice('ごみ箱を空にします。', true);
	pushChoice('前提条件チェックを実行して、Oracleデータベースがアップグレードの準備ができているかどうかを確認します。', true);
	pushChoice('アップグレードを開始する前に、すべてのユーザーテーブルスペースを「読み取り専用」に設定します。', false);
	pushChoice('AUDSYSスキーマとAUDIT_ADMINおよびAUDIT_VIEWERロールを削除します。', false);
	pushChoice('必要に応じて、アップグレード要件を満たすためにテーブルスペースのサイズを増やします。', true);
	sortChoice();
	
	//=============================================================================
	// 51
	//=============================================================================
	q_list.push(new Question('テープドライブが2つしかない場合に、メディアマネージャーを使用してバックアップをテープに書き込むときのRMANバックアップについて正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('RMAN圧縮が構成されていない場合でも、SBTテープ圧縮を使用できます。', true);
	pushChoice('この構成でSBTデバイスに書き込まれるバックアップセットには、最大2つのバックアップピースを含めることができます。', false);
	pushChoice('この構成でSBTデバイスに書き込まれるバックアップには、最大2つのバックアップセットを含めることができます。', false);
	pushChoice('SBTテープ圧縮とRMANバックアップ圧縮を並行して使用する必要があります。', false);
	pushChoice('SBTデバイスは、PARALLELISM 2を使用して両方のテープドライブを同時に使用できるように構成する必要があります。', true);
	sortChoice();
	
	//=============================================================================
	// 52
	//=============================================================================
	q_list.push(new Question('あなたはスタンドアロンサーバー用のOracleグリッドインフラストラクチャとOracleデータベースをサーバーに初めてインストールする予定です。'
	+ '\nこのコマンドとその結果を調べます。'
	+ '\n'
	+ '\n# id oracle'
	+ '\nuid=54321 (oracle) gid=54321(oinstall) group=54321(oinstall), 54322(dba)'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('oracleはOracle Inventoryの所有者になります。', true);
	pushChoice('oracleは、すべてのOracle Databaseインストールの所有者でなければなりません。', false);
	pushChoice('oracleはOracle Databaseインストールを所有できますが、Oracle Grid Infrastructureインストールは所有できません。', false);
	pushChoice('Oracle Databaseソフトウェアをインストールすると、oracleにSYSASM権限が付与されます。', false);
	pushChoice('ユーザーアカウントoracleおよびグループoinstallは、すべてのOracleソフトウェアのインストールに使用できます。', true);
	sortChoice();
	
	//=============================================================================
	// 53
	//=============================================================================
	q_list.push(new Question('この構成を調べます。'
	+ '\n'
	+ '\n1. CDB1は、ARCHIVELOGモードで実行されるコンテナーデータベースです。'
	+ '\n2. CDB1の制御ファイルは"/u01/app/oracle/oradata/CDB1/controlfile/controlfile01.ctl"および"/u02/app/oracle/fast_recover_area/cdb1/CDB1/controlfile02.ctl"に多重化されています。'
	+ '\n3. CDB1の唯一のバックアップは、CONTROLFILE AUTOBACKUPがOFFのときに行われました。'
	+ '\n4. スナップショット制御ファイル名は"/u01/app/oracle/product/12.2.0.1/db_1/dbs/snapcf_cdb1.f"です。'
	+ '\n  '
	+ '\nCDB1が開いている間、"/u02/app/oracle/fast_recover_area/cdb1/CDB1/controlfile02.ctl"が誤って削除されました。'
	+ '\nこの重大な障害から回復するために、次のコマンドを実行しました。'
	+ '\n'
	+ '\n$ rman target sys/oracle_4U@localhost:1521/cdb1'
	+ '\n'
	+ '\nRMAN> SHUTDOWN ABORT'
	+ '\n...'
	+ '\nOracle instance shut down'
	+ '\n'
	+ '\nRMAN> STARTUP NOMOUNT'
	+ '\n'
	+ '\nRMAN> RMAN RESTORE CONTROLFILE FROM'
	+ '\n  "/u01/app/oracle/oradata/CDB1/controlfile/controlfile01.ctl";'
	+ '\n'
	+ '\n結果はどうなりますか？',
	'A'));
	pushChoice('"$ORACLE_HOME/dbs/cdb1/CDB1/controlfile02.ctl"が作成されます', false);
	pushChoice('"/u01/app/oralce/oradata/CDB1/controlfile/controlfile02.ctl"が作成されます。', false);
	pushChoice('"/u02/app/oracle/fast_recover_area/cdb1/CDB1/controlfile02.ctl"が再作成されます。', true);
	pushChoice('"/u01/app/oracle/product/12.2.0.1/db_1/dbs/snapcf_cdb1control02.ctl"が作成されます。', false);
	pushChoice('制御ファイルの自動バックアップがないため、失敗します。', false);
	sortChoice();
	
	//=============================================================================
	// 54
	//=============================================================================
	q_list.push(new Question('これらのアクションを調べます。'
	+ '\n'
	+ '\n1. リカバリカタログ用の新しいデータベースを作成します。'
	+ '\n2. リカバリカタログ用に、カタログデータベースに十分なスペースのあるテーブルスペースを作成します。'
	+ '\n3. カタログデータベースのARCHIVELOGモードを構成します。'
	+ '\n4. ユーザーを作成して、カタログが含まれるテーブルスペースにクォータを持つリカバリカタログスキーマを所有します。'
	+ '\n5. RECOVERY_CATALOG_OWNERロールをリカバリカタログスキーマの所有者に付与します。'
	+ '\n6. SYSBACKUP権限をリカバリカタログスキーマの所有者に付与します。'
	+ '\n'
	+ '\nCREATE CATALOGコマンドを実行する前に実行する必要がある最小アクションはどれですか？',
	'B'));
	pushChoice('2, 4, 5, 6', false);
	pushChoice('1, 2, 3, 4, 5, 6', false);
	pushChoice('1, 2, 4, 5', false);
	pushChoice('2, 4, 5', true);
	pushChoice('1, 3, 4, 5', false);
	sortChoice();
	
	//=============================================================================
	// 55
	//=============================================================================
	q_list.push(new Question('Oracle 19c以降のリリースでスナップショットを使用してプラガブルデータベース（PDB）を作成する場合、正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('PDBスナップショットは、常にソースPDBの完全なコピーです。', false);
	pushChoice('PDBスナップショットは、常にソースPDBのスパースコピー(部分的に空のファイルを実際のファイルシステム上で少ない消費容量で効率的に保存する仕組み)です。', false);
	pushChoice('スナップショットコピーPDBは、特定のファイルシステムにのみ保存できるストレージスナップショットに依存しています。', true);
	pushChoice('PDBスナップショットは、任意のファイルシステムに格納できるストレージスナップショットに依存しています。', false);
	pushChoice('PDBスナップショットは、特定のファイルシステムにのみ保存できるストレージスナップショットに依存しています。', false);
	pushChoice('スナップショットコピーPDBは、任意のファイルシステムに格納できるストレージスナップショットに依存しています。', false);
	pushChoice('スナップショットコピーPDBは、スタンドアロンクローンPDBから作成できます。', true);
	sortChoice();

	//=============================================================================
	// 56
	//=============================================================================
	q_list.push(new Question('Oracle Database Configuration Assistant（DBCA）テンプレートについて正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('トランザクション処理の汎用テンプレートは、同時実行性と回復性が重要な基準である場合に最適です。', true);
	pushChoice('Oracle DBCAテンプレートは、論理構造のみを保存でき、データベースファイルは保存できません。', false);
	pushChoice('新しいテンプレートは、既存のユーザー作成テンプレートを変更することによってのみ作成できます。', false);
	pushChoice('データウェアハウステンプレートは、トランザクションの応答時間が重要な基準である場合に最適です。', false);
	pushChoice('Oracle DBCAテンプレートを使用して、新しいデータベースを作成し、既存のデータベースを複製できます。', true);
	sortChoice();

	//=============================================================================
	// 57
	//=============================================================================
	q_list.push(new Question('SALES_ROOTアプリケーションコンテナには、2つのアプリケーションPDBがあります。'
	+ '\nSALES_APPアプリケーションには、2つのPDBに共通のテーブルFIN.REVENUEがあります。'
	+ '\nこのクエリとその出力を調べます。'
	+ '\n'
	+ '\nSELECT containers_default, container_map, container_map_object, table_name'
	+ '\n  FROM dba_tables WHERE owner="FIN";'
	+ '\n'
	+ '\nCONTAINERS_DEFAULT  CONTAINER_MAP  CONTAINER_MAP_OBJECT  TABLE_NAME '
	+ '\n------------------- -------------- --------------------- -----------'
	+ '\nNO                  YES            NO                    REVENUE'
	+ '\nNO                  NO             YES                   MAPTABLE'
	+ '\n'
	+ '\n正しい説明を2つ選択しなさい。',
	'C'));
	pushChoice('CONTAINERS句は、REVENUEテーブルのクエリでは使用できません。', false);
	pushChoice('REVENUEテーブルは、リストパーティションテーブルである必要があります。', false);
	pushChoice('MAPTABLEテーブルは、REVENUEテーブルに一般的に使用される列の論理パーティションキーを定義します。', true);
	pushChoice('MAPTABLEテーブルは、メタデータにリンクされたテーブルです。', false);
	pushChoice('REVENUEテーブルのコンテナマップは存在しますが、有効になっていません。', true);
	pushChoice('REVENUEテーブルパーティションは、PDB間で自動的にプルーニングされません。', false);
	sortChoice();
	
	//=============================================================================
	// 58
	//=============================================================================
	q_list.push(new Question('コンテナーデータベースCDB1には、アプリケーションコンテナーHR_ROOTとアプリケーションPDB HR_PDB1があります。'
	+ '\nあなたHR_ROOTを含まないコンテナーデータベースCDB2にHR_PDB1を複製するために必要な権限を持っている。'
	+ '\n常に正しい説明を2つ選択しなさい。',
	'C'));
	pushChoice('CDB1とCDB2は共有UNDOモードでなければなりません。', false);
	pushChoice('共通ユーザーは、CREATE PLUGGABLE DATABASE権限を持つCDB2に存在している必要があります。', true);
	pushChoice('CDB1のHR_PDB1内のすべてのトランザクションは、クローン作成プロセスが開始する前にコミットする必要があります。', false);
	pushChoice('HR_ROOTを複製すると、HR_PDB1が自動的に複製されます。', false);
	pushChoice('CDB2で作成されたHR_PDB1クローンは、クローニングが終了するとマウント状態になります。', true);
	sortChoice();
	
	//=============================================================================
	// 59
	//=============================================================================
	q_list.push(new Question('Recovery Manager（RMAN）を使用せずに実行されるバックアップ、復元、およびリカバリー操作について正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('O/Sユーティリティを使用してNOARCHIVELOGモードでデータベースをバックアップするには、データベースインスタンスを起動し、データベースをMOUNT状態にする必要があります。', false);
	pushChoice('O/Sユーティリティを使用してARCHIVELOGモードでデータベースをバックアップするには、データベースインスタンスを起動し、データベースをMOUNT状態にする必要があります。', false);
	pushChoice('Oracleデータベースは、O/Sユーティリティを使用してコピーしたバックアップファイルから復元できます。', true);
	pushChoice('O/Sユーティリティを使用してコピーされたOracleデータファイルのバックアップは、イメージコピーとしてRMANカタログに追加できます。', true);
	pushChoice('O/Sユーティリティを使用してNOARCHIVELOGモードでデータベースをバックアップするには、データベースインスタンスをシャットダウンする必要があります。', true);
	pushChoice('O/Sユーティリティを使用してコピーされたOracleアーカイブログバックアップは、バックアップセットとしてRMANカタログに追加できます。', false);
	pushChoice('O/Sユーティリティを使用してARCHIVELOGモードでデータベースをバックアップするには、データベースインスタンスを起動し、データベースをOPEN状態にする必要があります。', false);
	sortChoice();
	
	//=============================================================================
	// 60
	//=============================================================================
	q_list.push(new Question('この構成を調べます。'
	+ '\n'
	+ '\n1. CDB1はコンテナーデータベースです。'
	+ '\n2. PDB1とPDB2は、CDB1内のプラガブルデータベースです。'
	+ '\n'
	+ '\n次のコマンドは正常に実行されました。'
	+ '\n'
	+ '\n$ export ORACLE_SID=cdb1'
	+ '\n'
	+ '\n$sqlplus / as sysdba'
	+ '\n'
	+ '\nSQL> SHUTDOWN IMMEDIATE'
	+ '\n...'
	+ '\nOracle instance shut down.'
	+ '\n'
	+ '\nSQL> STARTUP MOUNT'
	+ '\n...'
	+ '\nDatabase mounted.',
	'A'));
	pushChoice('PDB1とPDB2はMOUNT状態です。', true);
	pushChoice('REDOログが開かれます。', false);
	pushChoice('PDB1とPDB2は読み取り専用状態です。', false);
	pushChoice('CDB$ROOTはMOUNT状態です。', true);
	pushChoice('PDB$SEEDは読み取り専用状態です。', false);
	sortChoice();
	
	//=============================================================================
	// 61
	//=============================================================================
	q_list.push(new Question('Oracle Grid Infrastructureのアップグレードについて正しい説明を3つ選択しなさい。',
	'C'));
	pushChoice('直接アップグレードは、直前のバージョンのOracle Grid Infrastructureからのみ実行できます。', false);
	pushChoice('新しいバージョンは、既存のバージョンと同じサーバー上の別のOracle Grid Infrastructureホームにインストールされます。', true);
	pushChoice('既存のOracleベースを使用できます。', true);
	pushChoice('アップグレードプロセスでは、現在のバージョンのOracle Grid Infrastructureのすべての必須パッチが自動的にインストールされます。', false);
	pushChoice('アップグレードを開始する前に、既存のOracleデータベースインスタンスをシャットダウンする必要があります。', true);
	pushChoice('gridユーザーのみがアップグレードを実行できます。', false);
	sortChoice();
	
	//=============================================================================
	// 62
	//=============================================================================
	q_list.push(new Question('データベースはARCHIVELOGモードで構成されています。'
	+ '\n完全なRMANバックアップが存在しますが、トレースする制御ファイルのバックアップが取られていません。'
	+ '\nメディア障害が発生しました。'
	+ '\n不完全リカバリが必要なシナリオとして正しいものを2つ選択しなさい？',
	'B'));
	pushChoice('SYSAUX表領域データファイルを失った後。', false);
	pushChoice('INACTIVEオンラインREDOロググループのすべてのメンバーを失った後。', false);
	pushChoice('CURRENTオンラインREDOロググループのすべてのメンバーを失った後。', true);
	pushChoice('制御ファイルのすべてのコピーを失った後。', true);
	pushChoice('使用中のUNDO表領域を失った後。', false);
	sortChoice();
	
	//=============================================================================
	// 63
	//=============================================================================
	q_list.push(new Question('インスタンスリカバリについて正しい説明を2つ選択しなさい。',
	'B'));
	pushChoice('アーカイブされたログが欠落している場合は不可能です。', false);
	pushChoice('データベースがオープン状態になった後、自動的に実行されます。ただし、リカバリが必要なブロックは、リカバリされるまで使用できません。', false);
	pushChoice('FAST_START_MTTR_TARGETを低い値に設定すると、ダーティバッファーがディスクに頻繁に書き込まれるようになり、インスタンスの回復中に必要なI/Oの数が減るため、インスタンスの回復時間が短縮されます。', true);
	pushChoice('これは、リカバリライター（RVWR）バックグラウンドプロセスによって実行されます。', false);
	pushChoice('FAST_START_MTTR_TARGETを高い値に設定すると、ログライターがより頻繁に書き込みを行うようになり、インスタンスの回復中に必要なI/Oの数が減るため、インスタンスの回復時間が短縮されます。', false);
	pushChoice('データベースがMOUNT状態のまま、自動的に実行されます。次に、データベースが開かれます。', true);
	sortChoice();
	
	//=============================================================================
	// 64
	//=============================================================================
	q_list.push(new Question('Oracleオプティマイザ統計、それらの使用、および収集について正しい説明を2つ選択しなさい。',
	'C'));
	pushChoice('索引を使用してテーブルにアクセスするコストを評価するときは、テーブルの行数が考慮されます。', false);
	pushChoice('索引を使用するコストを評価するときに、インデックスバランスのとれたB*Treeの高さが考慮されます。', true);
	pushChoice('統計アドバイザーは、統計を収集する最良の方法を推奨するのに役立ちます。', true);
	pushChoice('DBMS_STATSを使用して収集された統計は、常に最良のオプティマイザ結果をもたらします。', false);
	pushChoice('統計アドバイザーは、すべての推奨事項のアクションを生成します。', false);
	sortChoice();
	
	//=============================================================================
	// 65
	//=============================================================================
	q_list.push(new Question('コンテナーデータベース（CDB）には、2つのプラガブルデータベースPDB1とPDB2が含まれています。'
	+ '\nLOCAL_UNDO_ENABLEDデータベースプロパティは、CDBでFALSEに設定されています。'
	+ '\nPDB2のデータファイル24が削除されたため、復元して回復する必要があります。'
	+ '\n存在する唯一のRMANバックアップは、CDB$ROOTに接続されているときにBACKUP DATABASEコマンドで作成されました。'
	+ '\n正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('データファイル24は、PDB2に接続されている間のみリカバリできます。', false);
	pushChoice('データファイル24は、CDB$ROOTに接続しているときにリストアおよびリカバリできます。', true);
	pushChoice('データファイル24は、CDB$ROOTに接続している間のみリストアできます。', false);
	pushChoice('データファイル24は、PDB2に接続している間のみリストアできます。', false);
	pushChoice('データファイル24は、PDB2に接続している間にリカバリできます。', true);
	pushChoice('データファイル24は、CDB$ROOTに接続しているときにリカバリできます。', true);
	sortChoice();
	
	//=============================================================================
	// 66
	//=============================================================================
	q_list.push(new Question('データポンプを使用した非CDBとPDB間のデータ移動について正しい説明を2つ選択しなさい。',
	'C'));
	pushChoice('非CDBまたはPDBのいずれかに完全なエクスポートをインポートする際、表領域は必要に応じて自動的に作成されます。', false);
	pushChoice('Oracleは、非CDBからPDBにスキーマを移動するときに、従来のデータベースユーザーをローカルユーザーに変換しようとします。', true);
	pushChoice('非CDBをCDBにインポートすると、新しいPDBが自動的に作成されます。', false);
	pushChoice('Oracleは、スキーマをPDBから非CDBに移動するときに、共通ユーザーを従来のユーザーに変換しようとします。', true);
	pushChoice('PDBから非CDBへのデータの移動は、トランスポータブル表領域のエクスポートとインポートを使用してのみ可能です。', false);
	pushChoice('非CDBからPDBへのデータの移動は、従来のエクスポートとインポートを使用した場合にのみ可能です。', false);
	sortChoice();
	
	//=============================================================================
	// 67
	//=============================================================================
	q_list.push(new Question('データベースをアップグレードした後の表データの移行に使用できる方法として正しいものを3つ選択しなさい。',
	'B'));
	pushChoice('データベースリプレイ', false);
	pushChoice('SQL Developer', true);
	pushChoice('Oracle Data Pump', true);
	pushChoice('O/Sコピーユーティリティー', false);
	pushChoice('Database Upgrade Assistant', false);
	pushChoice('CREATE TABLE AS SELECTコマンド', true);
	sortChoice();
	
	//=============================================================================
	// 68
	//=============================================================================
	q_list.push(new Question('Oracleインスタンスの回復について正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('リカバリは、CURRENT REDOロググループの先頭から開始されます。', false);
	pushChoice('リカバリは、インスタンス障害が発生する前にデータベースライターによって計算された最後のチェックポイント位置から始まります。', false);
	pushChoice('ACTIVE REDOロググループの先頭から、または他にACTIVEなグループがない場合はCURRENTロググループの先頭からリカバリが開始されます。', true);
	pushChoice('リカバリは、REDOスレッドの終わりまでREDOを読み取ります。 SMONはすべてのデッドトランザクションをロールバックし、その後、データべースが開かれます。', false);
	pushChoice('チェックポイントプロセス（CKPT）によって制御ファイルに記録された最後のチェックポイント位置から回復が始まります。', true);
	pushChoice('リカバリは、REDOスレッドの終わりまでREDOを読み取り、次にデータベースを開きます。その後、SMONはすべてのデッドトランザクションをロールバックします。', true);
	sortChoice();
	
	//=============================================================================
	// 69
	//=============================================================================
	q_list.push(new Question('この構成を調べます。'
	+ '\n'
	+ '\n1. ORCLデータベースデータファイルは、自動ストレージ管理（Oracle ASM）ディスクグループ+DATAにあります。'
	+ '\n2. ORCLは、高速リカバリ領域にディスクグループ+FRAを使用します。'
	+ '\n3. LISTENERはORCLのリスナーです。'
	+ '\n4. データベース、リスナー、ASMインスタンス、およびASMディスクグループは、Oracle Restartによって管理されます。'
	+ '\n5. すべてのコンポーネントは現在シャットダウンされています。'
	+ '\n'
	+ '\n次のコマンドを実行します。'
	+ '\n'
	+ '\n$ srvctl start database -d ORCL'
	+ '\n'
	+ '\n結果はどうなりますか？',
	'B'));
	pushChoice('ORCLデータベース、Oracle ASMインスタンス、+DATAおよび+FRAディスクグループ、およびLISTENERが起動します。', true);
	pushChoice('ORCLデータベースインスタンスのみが開始されます。', false);
	pushChoice('ORCLデータベースとASMインスタンスのみが起動されます。', false);
	pushChoice('ORCLデータベースインスタンス、Oracle ASMインスタンス、+DATAおよび+FRAディスクグループのみが起動されます。', false);
	pushChoice('ORCLデータベースインスタンスと+DATAおよび+FRAディスクグループのみが起動されます。', false);
	sortChoice();
	
	//=============================================================================
	// 70
	//=============================================================================
	q_list.push(new Question('TARGET接続なしのRecovery Manager（RMAN）複製について正しい説明を4つ選択しなさい。',
	'B'));
	pushChoice('複製されるデータベースのバックアップが、データベースがNOARCHIVELOGモードのときに行われた場合は、NOREDO句を使用する必要があります。', true);
	pushChoice('TARGETインスタンスへの接続が存在しない場合は、UNDO TABLESPACE句が常に必要です。', false);
	pushChoice('RMANはデータベースのバックアップをプッシュして、ネットワーク経由で補助インスタンスに複製します。', false);
	pushChoice('NOREDO句は、データベースがARCHIVELOGモードのときに複製されるデータベースのバックアップが取られた場合に使用できます。', false);
	pushChoice('複製されるデータベースのRMAN SBTベースのバックアップは、補助インスタンスで使用できます。', true);
	pushChoice('UNDO TABLESPACE句は、リカバリカタログへの接続が存在せず、TARGETデータベースが閉じている場合は常に必要です。', true);
	pushChoice('UNDO TABLESPACE句は、リカバリカタログへの接続が存在せず、TARGETデータベースが開かれている場合は常に必要です。', false);
	pushChoice('複製されるデータベースのRMANディスクベースのバックアップは、補助インスタンスで使用できます。', true);
	sortChoice();
	
	//=============================================================================
	// 71
	//=============================================================================
	q_list.push(new Question('正しい説明を3つ選択しなさい。',
	'D'));
	pushChoice('アプリケーションルート内のオブジェクトの仮想プライベートデータベース（VPD）ポリシーは、アプリケーションコンテナーに含まれるすべてのアプリケーションPDBと自動的に同期されます。', false);
	pushChoice('アプリケーション共通のTSDPポリシーは常にコンテナ固有です。', true);
	pushChoice('アプリケーション共通の透過的セキュリティデータ保護（TSDP）ポリシーは、アプリケーションのインストール/パッチのBEGIN-ENDブロック内でのみ作成できます。', false);
	pushChoice('アプリケーション共通のOracle Label Security（OLS）ポリシーは、インストール/パッチのBEGIN-ENDブロック外のアプリケーションルートでは作成できません。', true);
	pushChoice('アプリケーションルートのファイングレイン監査（FGA）ポリシーは、アプリケーションコンテナーに含まれるすべてのアプリケーションPDBに自動的に同期されます。', false);
	pushChoice('アプリケーション共通OLSポリシーは、インストール/パッチBEGIN-ENDブロック内のアプリケーションルートに作成できます。', false);
	pushChoice('統合監査は、アプリケーションコンテナ内のすべてのアプリケーションPDBに自動的に同期できます。', true);
	sortChoice();
	
	//=============================================================================
	// 72
	//=============================================================================
	q_list.push(new Question('自動ワークロードリポジトリ（AWR）について正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('デフォルトでは、AWRスナップショットは60分ごとに取得されます。', true);
	pushChoice('その収集レベルは、STATISTICS_LEVELデータベースパラメータの値によって決まります。', true);
	pushChoice('デフォルトでは、AWRスナップショットは7日間保持されます。', false);
	pushChoice('AWRスナップショットの取得を無効にすることができます。', true);
	pushChoice('AWRデータはSYSTEM表領域に格納されています。', false);
	sortChoice();
	
	//=============================================================================
	// 73
	//=============================================================================
	q_list.push(new Question('自動ブロック修復について正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('自動ブロック修復では、DB_BLOCK_CHECKING = TRUEの場合、ノースタンバイデータベースのブロックを修復できます。', false);
	pushChoice('フィジカルスタンバイデータベースで自動ブロック修復を実行するには、フィジカルスタンバイデータベースでリアルタイムクエリを有効にする必要があります。', true);
	pushChoice('フィジカルスタンバイデータベースで自動ブロック修復を実行するには、プライマリデータベースでリアルタイムクエリを有効にする必要があります。', false);
	pushChoice('メディア破損ブロックは不可能です。', false);
	pushChoice('プライマリデータベースで自動ブロック修復を実行するには、フィジカルスタンバイデータベースでリアルタイムクエリを有効にする必要があります。', true);
	sortChoice();
	
	//=============================================================================
	// 74
	//=============================================================================
	q_list.push(new Question('Oracle Managed Files（OMF）はCDBで有効になっており、このコマンドは正常に実行されました。'
	+ '\n'
	+ '\nCREATE PLUGGABLE DATABASE app1'
	+ '\n  AS APPLICATION CONTAINER'
	+ '\n  ADMIN USER admin1 IDENTIFIED BY app_123 ROLES=(CONNECT);'
	+ '\n'
	+ '\n正しい説明を3つ選択しなさい。',
	'B'));
	pushChoice('APP1アプリケーションコンテナに作成されるアプリケーションPDBは、APP1$SEEDから複製されます。', false);
	pushChoice('APP1のアプリケーションシードPDBが作成されます。', false);
	pushChoice('APP1のアプリケーションルートPDBが作成されます。', true);
	pushChoice('アプリケーションルートAPP1のデフォルトサービスが作成されます。', true);
	pushChoice('APP1アプリケーションコンテナに作成されるアプリケーションPDBは、PDB$SEEDから複製されます。', true);
	pushChoice('APP1を取り外すことはできません。', false);
	sortChoice();
	
	//=============================================================================
	// 75
	//=============================================================================
	q_list.push(new Question('RMAN暗号化について正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('RMAN暗号化キーは、データベースキーストアに格納されます。', true);
	pushChoice('RMANは、Oracleデータベースのパスワードファイルを暗号化できます。', false);
	pushChoice('暗号化に使用されたパスワードとキーストアの両方が利用可能な場合にのみ、デュアルモード暗号化バックアップを復元できます。', false);
	pushChoice('SET ENCRYPTIONコマンドは、CONFIGURE ENCRYPTIONコマンドで指定された暗号化設定をオーバーライドします。', true);
	pushChoice('パスワードの暗号化は、CONFIGURE ENCRYPTIONコマンドを使用して永続的に構成できます。', false);
	sortChoice();
	
	//=============================================================================
	// 76
	//=============================================================================
	q_list.push(new Question('LinuxでのOracleデータベースのインストールの実行について正しい説明を3つ選択しなさい。',
	'C'));
	pushChoice('runfixup.shスクリプトは、不足しているRPMをインストールできます。', false);
	pushChoice('Oracleデータベースのインストール所有者、Oracle Inventoryグループ、およびOracle管理特権グループを構成するには、Oracle Preinstallation RPMを使用する必要があります。', false);
	pushChoice('Oracleデータベースサーバーでサポートされている言語を選択できます。', true);
	pushChoice('これは、スタンドアロンサーバー用のグリッドインフラストラクチャをインストールする前に実行できます。', false);
	pushChoice('Oracle Preinstallation RPMを使用して、Oracleデータベースのインストール所有者、Oracle Inventoryグループ、およびOracle管理特権グループを構成できます。', true);
	pushChoice('これは、スタンドアロンサーバー用のグリッドインフラストラクチャをインストールした後に実行できます。', true);
	pushChoice('Oracleデータベース管理者は、root特権スクリプトを調整するために、rootオペレーティングシステムアカウントへのアクセスを許可される必要があります。', false);
	sortChoice();
	
	//=============================================================================
	// 77
	//=============================================================================
	q_list.push(new Question('Oracle Database 19c以降のリリースのRecovery Manager（RMAN）について正しい説明を3つ選択しなさい。',
	'C'));
	pushChoice('RMANがターゲットとしてプラガブルデータベースに接続できるのは、RMAN仮想プライベートカタログが使用されている場合のみです。', false);
	pushChoice('RMANカタログが使用されている場合、RMANはターゲットとしてプラガブルデータベースに接続することが常に可能です。', true);
	pushChoice('コンテナデータベースの登録に使用される仮想プライベートカタログは、プラガブルデータベースに作成する必要があります。', false);
	pushChoice('コンテナデータベースの登録に使用される仮想プライベートカタログは、プラガブルデータベースに作成できます。', true);
	pushChoice('RMANは、プラガブルデータベースにターゲットとして接続することが常に可能です。', false);
	pushChoice('コンテナデータベースの登録に使用される仮想プライベートカタログは、非コンテナデータベースに作成できます。', true);
	sortChoice();
	
	//=============================================================================
	// 78
	//=============================================================================
	q_list.push(new Question('Oracle 19c以降のリリースで正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('パスワードファイルの場所が変更されると、新しい場所がOracleサーバーによって自動的に使用されます。', false);
	pushChoice('スキーマのみのアカウントには、管理者権限を付与できます。', true);
	pushChoice('オラクル社が提供するアカウントはすべてスキーマのみのアカウントです。', false);
	pushChoice('Privilege AnalysisはOracle Enterprise Editionに含まれており、Database Vaultは不要になりました。', true);
	pushChoice('統合監査は、監査対象のユーザーによって間接的に発行されたイベントのみを監査するように構成できます。', false);
	pushChoice('統合監査は、監査対象のユーザーが直接発行したイベントのみを監査するように構成できます。', true);
	sortChoice();
	
	//=============================================================================
	// 79
	//=============================================================================
	q_list.push(new Question('メディアにバックアップを書き込むようにRMAN SBTチャネルを構成しました。'
	+ '\n次に、次のコマンドを使用してRMANバックアップを作成します。'
	+ '\n'
	+ '\nRMAN> BACKUP AS COMPRESSED BACKUPSET DATABASE'
	+ '\n  KEEP UNTIL TIME "SYSDATA + 730"'
	+ '\n  RESTORE POINT "OLD_CONFIGURATION";'
	+ '\n'
	+ '\n正しい説明を3つ選択しなさい。',
	'A'));
	pushChoice('復元ポイントは、アーカイブバックアップが作成されてから2年後に保存されるシステム変更番号（SCN）のラベルです。', false);
	pushChoice('自己完結型アーカイブバックアップのデータファイルバックアップは、保存ポリシーに関係なく、2年間不要とは見なされません。', true);
	pushChoice('このバックアップ後に作成されたすべてのアーカイブログは2年間保持されます。', false);
	pushChoice('SPFILEは、自己完結型のアーカイブバックアップに含まれています。', true);
	pushChoice('制御ファイルは、自己完結型のアーカイブバックアップに含まれています。', true);
	pushChoice('復元ポイントは、アーカイブバックアップが作成される前のシステム変更番号（SCN）のラベルです。', false);
	sortChoice();
	
	//=============================================================================
	// 80
	//=============================================================================
	q_list.push(new Question('USERSテーブルスペースはデータファイル3と4で構成され、常に読み取り/書き込みモードでオンラインである必要があります。'
	+ '\nRMANを使用してこのテーブルスペースのオープンデータベースバックアップを実行することについて正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('バックアップは段階的に行う必要があります。', false);
	pushChoice('バックアップはバックアップセットに含まれている必要があります。', false);
	pushChoice('データベースがARCHIVELOGモードの場合のみ、バックアップを取得できます。', true);
	pushChoice('バックアップは段階的に行うことができます。', true);
	pushChoice('データベースはRMANカタログに登録する必要があります。', false);
	pushChoice('一貫性のあるバックアップのみを作成できます。', false);
	sortChoice();
	
	//=============================================================================
	// 81
	//=============================================================================
	q_list.push(new Question('RMANバックアップセットについて正しい説明を4つ選択しなさい。',
	'A'));
	pushChoice('バックアップピースは、1つのバックアップセットにのみ属することができます。', true);
	pushChoice('データファイルは、異なるバックアップセットに保存された複数のセクションに分割できます。', false);
	pushChoice('データファイルは、同じバックアップセットの異なるバックアップピースに保存された複数のセクションに分割できます。', true);
	pushChoice('複数のデータファイルのブロックを1つのバックアップピースに含めることができます。', true);
	pushChoice('バックアップセットに含めることができるバックアップピースは1つだけです。', false);
	pushChoice('バックアップセットはテープメディアに書き込む必要があります。', false);
	pushChoice('バックアップセットはディスクに書き込む必要があります。', false);
	pushChoice('複数のデータファイルのブロックを1つのバックアップセットに含めることができます。', true);
	sortChoice();
	
	//=============================================================================
	// 82
	//=============================================================================
	q_list.push(new Question('OracleコンテナデータベースのRMANバックアップの作成について正しい説明を2つ選択しなさい。',
	'A'));
	pushChoice('同一の名前を持つ異なるPDBからの表領域は、RMANを各PDBに個別に接続してバックアップする必要があります。', false);
	pushChoice('BACKUP DATABASEコマンドは、RMANがPDBに接続されているときに、プラガブルデータベース（PDB）バックアップを作成します。', true);
	pushChoice('SPFILEバックアップは、アプリケーションルートPDBに接続しているときに作成できます。', false);
	pushChoice('BACKUP DATABASE PLUS ARCHIVELOGコマンドは、RMANがPDBに接続されているときにアーカイブログをバックアップします。', false);
	pushChoice('BACKUP PLUGGABLE DATABASEコマンドを使用して、CDB$ROOTをバックアップできます。', true);
	sortChoice();
	
	//=============================================================================
	// 83
	//=============================================================================
	q_list.push(new Question('Oracle Database 19c以降、Oracle Database Configuration Assistant（DBCA）を使用して実行できることとして正しい説明を3つ選択しなさい。',
	'B'));
	pushChoice('インタラクティブモードでのリモートコンテナデータベースの複製', false);
	pushChoice('サイレントモードでのリモートプラガブルデータベースのクローン作成', true);
	pushChoice('インタラクティブモードでのリモートプラガブルデータベースの再配置', false);
	pushChoice('サイレントモードでのリモートコンテナデータベースの再配置', false);
	pushChoice('サイレントモードでのリモートコンテナデータベースの複製', true);
	pushChoice('サイレントモードでのリモートプラガブルデータベースの再配置', true);
	pushChoice('インタラクティブモードでのリモートコンテナデータベースの再配置', false);
	sortChoice();
	
	//=============================================================================
	// 84
	//=============================================================================
	q_list.push(new Question('これらのクエリとその出力を調べます。'
	+ '\n'
	+ '\nSQL> select pdb_nama, name, pdb_restore_point, clean_pdb_restore_point'
	+ '\n  2  from v$restore_point natural join dba_rdbs;'
	+ '\n'
	+ '\nPDB_NAME  NAME  PDB_RESTORE_POINT  CLEAN_PDB_RESTORE_POINT'
	+ '\n--------- ----- ------------------ ------------------------'
	+ '\nPDB1      R1    YES                NO'
	+ '\n'
	+ '\nSQL> select propeyty_name, propeyty_value'
	+ '\n  2  from database_properties where property_name like "%UNDO&";'
	+ '\n'
	+ '\nPROPERTY_NAME       PROPERTY_VALUE'
	+ '\n------------------- ---------------'
	+ '\nLOCAL_UNDO_ENABLED  FALSE'
	+ '\n'
	+ '\nCDBのオンラインRMANバックアップは、復元ポイントR1が作成される1時間前に行われました。'
	+ '\nPDB1を復元してポイントR1へと復元します。'
	+ '\nこれをどのように達成しますか？',
	'B'));
	pushChoice('PDB1に接続した状態でRMANを使用して、FLASHBACK PLUGGABLE DATABASE PDB1を実行し、ポイントR1を復元します。', false);
	pushChoice('PDB1に接続した状態でSQLを使用してFLASHBACK PLUGGABLE DATABASE PDB1を実行し、ポイントR1を復元します。', false);
	pushChoice('CDB$ROOTに接続しているときにSQLを使用してFLASHBACK PLUGGABLE DATABASE PDB1を実行し、POINT R1を復元します。', false);
	pushChoice('CDB$ROOTに接続しているときにRMANを使用してFLASHBACK PLUGGABLE DATABASE PDB1を実行し、ポイントR1を復元します。', true);
	pushChoice('クリーンな復元ポイントがないため、これは実行できません。', false);
	sortChoice();
	
	//=============================================================================
	// 85
	//=============================================================================
	q_list.push(new Question('データリカバリアドバイザを使用してOracleデータベースの障害状況を診断する場合の説明として正しいものを2つ選択しなさい。',
	'B'));
	pushChoice('Data Recovery AdvisorのLIST FAILUREコマンドを使用するには、障害をリストするデータベースが常にMOUNT状態である必要があります。', false);
	pushChoice('障害は、修復されたときにのみ閉じることができます。', false);
	pushChoice('データベースが閉じている場合、Data Recovery Advisorを使用できます。', false);
	pushChoice('Data Recovery AdvisorのCHANGE FAILUREコマンドは、障害の優先順位を変更するためにのみ使用できます。', true);
	pushChoice('Data Recovery Advisorは障害を事前にチェックできます。', true);
	sortChoice();
	
	//=============================================================================
	// 86
	//=============================================================================
	q_list.push(new Question('アプリケーションコンテナーをコンテナーデータベースから取り外し、別のコンテナーデータベースにプラグインすることについて正しいのはどれですか？',
	'A'));
	pushChoice('アプリケーションルートをCDBからアンプラグすると、そのアプリケーションPDBがすべてアンプラグされます。', false);
	pushChoice('アプリケーションコンテナーがアンプラグされるデータベースでローカルの取り消しモードのみが必要です。', false);
	pushChoice('アプリケーションコンテナーのアプリケーションルートを他のCDBにプラグインしてから、そのアプリケーションPDBをプラグインする必要があります。', true);
	pushChoice('アプリケーションコンテナー内のアプリケーションPDBは、アプリケーションルートがアンプラグされる前にアンプラグされる必要があります。', true);
	pushChoice('アプリケーションルートを別のCDBプラグインに接続するすべてのアプリケーションPDBにプラグインします。', false);
	pushChoice('両方のコンテナーデータベースでローカルの取り消しモードが必要です。', false);
	sortChoice();
	
	//=============================================================================
	// 87
	//=============================================================================
	q_list.push(new Question('Recovery Manager（RMAN）を使用したTablespace Point-In-Time Recovery（TSPITR）の実行について正しい説明を4つ選択しなさい。',
	'B'));
	pushChoice('RMANは常に、UNDOセグメントを含むテーブルスペースをリカバリセットに含めます。', false);
	pushChoice('切り捨てられたテーブルを回復するために使用できます。', true);
	pushChoice('RMANが管理する補助インスタンスを使用して実行できます。', true);
	pushChoice('RMANカタログを使用せずに、正しい時刻が見つかるまで繰り返し実行できます。', false);
	pushChoice('フラッシュバックデータベースを機能させるには、データベースを有効にする必要があります。', false);
	pushChoice('DBAが管理する補助インスタンスを使用して実行できます。', true);
	pushChoice('ドロップされた表スペースをリカバリーするために使用できます。', false);
	pushChoice('RMANは必要なテーブルスペースを自動的にリカバリセットに追加して、自己完結型にします。', true);
	sortChoice();
	
	//=============================================================================
	// 88
	//=============================================================================
	q_list.push(new Question('Oracle 19c以降のリリースについて正しい説明を3つ選択しなさい。',
	'C'));
	pushChoice('トランスポータブル表領域の操作中に、表領域が読み取り/書き込みモードのままになることはありません。', false);
	pushChoice('暗号化された列を持つテーブルの通常のデータポンプエクスポートでは、インポート時に常に同じ列が暗号化されます。', false);
	pushChoice('トランスポータブルデータポンプのインポートにより、プラグインされたテーブルスペースが読み取り専用モードのままになる場合があります。', true);
	pushChoice('同時データポンプジョブは、プラガブルデータベース（PDB）レベルで制限できます。', true);
	pushChoice('トランスポータブルデータポンプのインポートにより、プラグインされたテーブルスペースが読み取り/書き込みモードのままになる可能性があります。', true);
	pushChoice('トランスポータブル表領域の操作中、表領域は常に読み取り/書き込みモードのままです。', false);
	sortChoice();
	
	//=============================================================================
	// 89
	//=============================================================================
	q_list.push(new Question('コンテナデータベースの監査ポリシーについて正しい説明を3つ選択しなさい。',
	'D'));
	pushChoice('すべての監査レコードはCDB$ROOTの監査証跡に書き込まれます。', false);
	pushChoice('共通の統合監査ポリシーをアプリケーションレベルで作成できます。', true);
	pushChoice('CDBレベルで共通の統一監査ポリシーを作成できます。', true);
	pushChoice('アプリケーションPDBはローカル監査ポリシーを持つことができません。', false);
	pushChoice('アプリケーションルートで定義されたファイングレイン監査ポリシーは、アプリケーションルートに含まれる各アプリケーションPDBによって手動で同期する必要があります。', true);
	pushChoice('アプリケーションルートで定義されたアプリケーション共通の統合監査ポリシーは、アプリケーションルートに含まれる各アプリケーションPDBによって手動で同期する必要があります。', false);
	sortChoice();
}());

(function(){
    sortQuestion();
}());
