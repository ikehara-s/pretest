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
	
	//=============================================================================
	// 12
	//=============================================================================
	q_list.push(new Question('セッションとサービスのモニタリング待機について正しい説明を3つ選択しなさい。',
	''));
	pushChoice('V$SESSION_EVENTは、セッションで少なくとも1回待機が発生した場合、過去および既存のすべてのセッションの待機をすべて表示する。', false);
	pushChoice('V$SERVICE_EVENTは、サービスに対して少なくとも1回待機が発生した場合、すべてのサービスのすべての待機を表示する。', true);
	pushChoice('V$SESSION_WAIT_CLASSは、待機中のセッションについてのみ、待機クラスごとに分類された待機を表示する。', true);
	pushChoice('V$SESSION_WAITとV$SESSIONの両方に、待機していないセッションが最後に待機したイベントの詳細が含まれている。', false);
	pushChoice('V$SESSION_EVENTは、セッションで少なくとも1回待機が発生した場合、過去のすべてのセッションの待機をすべて表示する。', false);
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
	''));
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
	''));
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
	''));
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
	''));
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
	'答えは3つ'));
	pushChoice('デフォルトでは、転送されたデータベースはOracle Managed Files（OMF）を使用します。', true);
	pushChoice('データファイルは宛先システムで変換できます。', true);
	pushChoice('データファイルはソースシステムで変換できます。', true);
	pushChoice('転送されたデータベース用に新しいDBIDが自動的に作成されます。', false);
	pushChoice('データベースは、エンディアン形式が異なるシステム間で転送できます。', true);
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
	''));
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
	''));
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
	'答えは2つ'));
	pushChoice('SQL Access Advisorと統合されています。', false);
	pushChoice('SQLワークロードの応答時間に対するシステム変更の影響を予測します。', true);
	pushChoice('分析タスクの各SQLステートメントの実行前後の統計を提供します。', true);
	pushChoice('分析タスク内のすべてのSQLステートメントをグループとして詳細に分析できます。', true);
	pushChoice('最初に同時に実行されたSQLステートメントは、SPAによって同時に実行されます。', false);
	sortChoice();
}());

(function(){
    sortQuestion();
	console.log(q_list);	
}());
