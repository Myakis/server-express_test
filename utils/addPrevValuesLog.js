export const addPrevValues = (log, prevLog = null) => {
  return log.times.map((item, i) => ({
    ...item,
    prevWeight: prevLog ? prevLog.times[i].weight : 0,
    prevRepeat: prevLog ? prevLog.times[i].repeat : 0,
  }))
}
