export default class PAGINATION {
  /**
   * Required Fields
   * - 이 필드들은 페이징 계산을 위해 반드시 입력되어야 하는 필드 값들이다.
   *
   * currentPageNo : 현재 페이지 번호
   * recordCountPerPage : 한 페이지당 게시되는 게시물 건 수
   * pageSize : 페이지 리스트에 게시되는 페이지 건수,
   * totalRecordCount : 전체 게시물 건 수.
   */

  /**
   * Not Required Fields
   * - 이 필드들은 Required Fields 값을 바탕으로 계산해서 정해지는 필드 값이다.
   *
   * totalPageCount: 페이지 개수
   * firstPageNoOnPageList : 페이지 리스트의 첫 페이지 번호
   * lastPageNoOnPageList : 페이지 리스트의 마지막 페이지 번호
   * firstRecordIndex : 페이징 SQL의 조건절에 사용되는 시작 rownum.
   * lastRecordIndex : 페이징 SQL의 조건절에 사용되는 마지막 rownum.
   */
  public currentPageNo = 0
  public recordCountPerPage = 0
  public pageSize = 0
  public totalRecordCount = 0

  public totalPageCount = 0
  public firstPageNoOnPageList = 0
  public lastPageNoOnPageList = 0
  public firstRecordIndex = 0
  public lastRecordIndex = 0

  public firstPageNo = 0
  public lastPageNo = 0
}
